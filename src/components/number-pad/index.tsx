import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { cn } from '~/utils/cn';

import { Button } from '../button';
import { Modal, ModalFooter, ModalHeader, ModalTitle } from '../modal';

const NUMBERS: Array<{
    number: number | '*' | '#';
    letters: string;
    src?: string;
    alt?: string;
}> = [
    {
        number: 1,
        letters: '',
        src: '/icons/voicemail.svg',
        alt: 'voicemail',
    },
    {
        number: 2,
        letters: 'ABC',
    },
    {
        number: 3,
        letters: 'DEF',
    },
    {
        number: 4,
        letters: 'GHI',
    },
    {
        number: 5,
        letters: 'JKL',
    },
    {
        number: 6,
        letters: 'MNO',
    },
    {
        number: 7,
        letters: 'PQRS',
    },
    {
        number: 8,
        letters: 'TUV',
    },
    {
        number: 9,
        letters: 'WXYZ',
    },
    {
        number: '*',
        letters: '',
    },
    {
        number: 0,
        letters: '+',
    },
    {
        number: '#',
        letters: '',
    },
] as const;

export const NumberPad: React.FC<{
    phoneNumber: string;
    onClick: (value: string) => void;
    selectedCountryCode?: string;
    showOptions?: boolean;
}> = ({ onClick, phoneNumber, selectedCountryCode, showOptions }) => {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const makeCall = () => {
        if (phoneNumber.length <= 6 || isNaN(Number(phoneNumber))) {
            setIsOpen(true);
            return;
        }
        navigate(`/calling/${selectedCountryCode}-${phoneNumber}`);
    };
    return (
        <>
            <div className='grid grid-cols-3 gap-3 px-5'>
                {NUMBERS.map(({ number, letters, src }) => (
                    <Button
                        key={number}
                        variant={'numberPadPrimary'}
                        size={'numberPad'}
                        onClick={() => {
                            onClick(number.toString());
                        }}
                    >
                        <span className='text-[30px]'>{number}</span>
                        {src ? (
                            <img src={src} className='size-3' alt=''></img>
                        ) : null}
                        {letters ? (
                            <span className='text-[10px]'>{letters}</span>
                        ) : null}
                    </Button>
                ))}
                {showOptions ? (
                    <>
                        <Button
                            variant={'numberPad'}
                            size={'numberPad'}
                            className='items-center justify-center gap-1'
                        >
                            <img
                                src='/icons/history.svg'
                                className='size-8'
                                alt='history'
                            />
                            <span className='text-[10px]'>History</span>
                        </Button>
                        <Button
                            variant={'numberPad'}
                            size={'numberPad'}
                            className={cn(
                                'm-auto',
                                phoneNumber.length > 6
                                    ? 'bg-[#B9FF66]'
                                    : 'bg-[#E9FFC799]',
                            )}
                            onClick={makeCall}
                        >
                            <img
                                src={
                                    phoneNumber.length > 6
                                        ? '/icons/callBlack.svg'
                                        : '/icons/call.svg'
                                }
                                className='size-8'
                                alt='phone'
                            />
                        </Button>
                        <Button
                            variant={'numberPad'}
                            size={'numberPad'}
                            className='items-center justify-center gap-1'
                        >
                            <img
                                src='/icons/contact.svg'
                                className='size-8'
                                alt='contact'
                            />
                            <span className='text-[10px]'>Contacts</span>
                        </Button>
                    </>
                ) : null}
            </div>
            <Modal
                isOpen={isOpen}
                showCloseIcon={false}
                onClose={() => {
                    setIsOpen(false);
                }}
                size={'small'}
            >
                <ModalHeader>
                    <ModalTitle>Invalid Number</ModalTitle>
                </ModalHeader>
                <div className='text-sm text-[#5E5E5E]'>
                    The number you have entered is invalid. Please check the
                    number and try again.
                </div>
                <ModalFooter>
                    <Button
                        variant={'outline'}
                        onClick={() => {
                            setIsOpen(false);
                        }}
                        className='h-10 w-full font-medium'
                    >
                        OK
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};
