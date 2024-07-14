import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, NumberPad } from '~/components';

import { formatTime } from '~/utils/utilityFn';

import { CallControls } from './CallControls';
import { ContactInfo } from './ContactInfo';
import { useCallStatus } from './useCallStatus';
import { useCallTimer } from './useCallTimer';

const TIMEOUTS = {
    CALL_CONNECTION: 2000,
    CALL_DISCONNECTION: 2000,
};

export const CallingScreen = () => {
    const navigate = useNavigate();
    const { phoneNumber } = useParams<{ phoneNumber: string }>();
    const { seconds, startTimer, stopTimer } = useCallTimer();
    const { callStatus, setCallStatus } = useCallStatus();

    const [ivrInput, setIvrInput] = useState('');
    const [isNumberPadVisible, setIsNumberPadVisible] = useState(false);

    useEffect(() => {
        const callConnectionTimeout = setTimeout(() => {
            setCallStatus('connected');
            startTimer();
        }, TIMEOUTS.CALL_CONNECTION);

        return () => {
            clearTimeout(callConnectionTimeout);
        };
    }, [setCallStatus, startTimer]);

    const handleCallDisconnection = (): void => {
        setCallStatus('disconnected');
        stopTimer();
        setTimeout(() => {
            navigate('/');
        }, TIMEOUTS.CALL_DISCONNECTION);
    };

    const handleIvrInput = (digit: string): void => {
        setIvrInput((prev) => `${prev}${digit}`);
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='flex w-full items-center justify-between px-5 py-3 text-xs'>
                <span className='font-medium'>Calling from</span>
                <span className='text-[#5E5E5E]'>{phoneNumber}</span>
            </div>

            {/* contact info */}
            <ContactInfo
                phoneNumber={phoneNumber ?? ''}
                callStatus={callStatus}
                callDuration={formatTime(seconds)}
            />

            {/* call controls */}
            <div className='flex h-[480px] w-full flex-col justify-between'>
                {isNumberPadVisible ? (
                    <NumberPad
                        phoneNumber={ivrInput}
                        onClick={handleIvrInput}
                    />
                ) : (
                    <CallControls
                        disconnecting={callStatus === 'disconnected'}
                        setIsNumberPadVisible={() => {
                            setIsNumberPadVisible(true);
                        }}
                    />
                )}

                <div className='mb-11 grid grid-cols-3 gap-x-8 px-12'>
                    <div />
                    <Button
                        variant='numberPadPrimary'
                        size={'numberPad'}
                        onClick={handleCallDisconnection}
                        className={'bg-[#FD3C2E]'}
                    >
                        <img src='/icons/endCall.svg' alt='hand-up' />
                    </Button>

                    {isNumberPadVisible ? (
                        <div>
                            <Button
                                variant='numberPad'
                                size={'numberPad'}
                                onClick={() => {
                                    setIsNumberPadVisible(false);
                                }}
                                className='flex flex-col items-center gap-1'
                            >
                                <img
                                    src={'/icons/expand.svg'}
                                    alt='hide'
                                    className='size-5'
                                />
                                <span className='text-[10px] text-[#232323]'>
                                    Hide
                                </span>
                            </Button>
                        </div>
                    ) : (
                        <div />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CallingScreen;
