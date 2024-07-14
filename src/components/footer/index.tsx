import { useNavigate } from 'react-router-dom';

import { Button } from '../button';

export const Footer: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className='flex h-16'>
            <Button variant={'primary'} size={'homeRow'}>
                <img
                    src={'/icons/home.svg'}
                    alt='home'
                    className='size-[30px]'
                />
                <span className='text-xs text-[#A5A5A5]'>Home</span>
            </Button>
            <Button variant={'primary'} size={'homeRow'}>
                <img
                    src={'/icons/chat.svg'}
                    alt='chat'
                    className='size-[30px]'
                />
                <span className='text-xs text-[#A5A5A5]'>Message</span>
            </Button>
            <Button variant={'primary'} size={'homeRow'}>
                <img
                    src={'/icons/keypad.svg'}
                    alt='dialler'
                    className='size-[30px]'
                />
                <span className='text-xs text-[#A5A5A5]'>Keypad</span>
            </Button>
            <Button variant={'primary'} size={'homeRow'}>
                <img
                    src={'/icons/callToolbar.svg'}
                    alt='call'
                    className='size-[30px]'
                    onClick={() => {
                        navigate('incoming/+1-1234567890');
                    }}
                />
                <span className='text-xs text-[#A5A5A5]'>Call</span>
            </Button>
            <Button variant={'primary'} size={'homeRow'}>
                <img
                    src={'/icons/contactGray.svg'}
                    alt='contact'
                    className='size-[30px]'
                />
                <span className='text-xs text-[#A5A5A5]'>Contact</span>
            </Button>
        </div>
    );
};
