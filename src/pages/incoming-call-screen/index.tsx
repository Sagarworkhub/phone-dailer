import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '~/components';

import { ContactInfo } from '~/pages/calling-screen/ContactInfo';

export const IncomingCallScreen: React.FC = () => {
    const navigate = useNavigate();
    const { phoneNumber } = useParams();

    const answerCall = () => {
        navigate(`/calling/${phoneNumber}`);
    };

    const rejectCall = () => {
        navigate('/');
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='flex w-full items-center justify-between px-5 py-3 text-xs'>
                <span className='font-medium'>incoming call to</span>
                <span className='text-[#5E5E5E]'>{phoneNumber}</span>
            </div>
            <ContactInfo
                phoneNumber={phoneNumber ?? ''}
                callStatus={'incoming'}
            />
            <div className='flex h-[480px] w-full flex-col justify-end'>
                <div className='mb-11 grid grid-cols-3 gap-x-8 px-16'>
                    <Button
                        variant='numberPadPrimary'
                        size={'numberPad'}
                        onClick={rejectCall}
                        className={'bg-[#FD3C2E]'}
                    >
                        <img src='/icons/endCall.svg' alt='hand-up' />
                    </Button>
                    <div />
                    <Button
                        variant='numberPadPrimary'
                        size={'numberPad'}
                        onClick={answerCall}
                        className={'bg-[#33D059]'}
                    >
                        <img src='/icons/callWhite.svg' alt='hand-up' />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default IncomingCallScreen;
