import { ArrowBigUp, Delete, Dot } from 'lucide-react';
import { useState } from 'react';

import { KeyboardRow } from './KeyboardRow';

interface KeyboardProps {
    onKeyPress: (key: string) => void;
    onDelete: () => void;
    onSpace: () => void;
    onEnter: () => void;
}

const KEYBOARD_ROWS = {
    top: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'] as const,
    home: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'] as const,
    bottom: ['Z', 'X', 'C', 'V', 'B', 'N', 'M'] as const,
};

const Keyboard: React.FC<KeyboardProps> = ({
    onKeyPress,
    onDelete,
    onSpace,
    onEnter,
}) => {
    const [capsLock, setCapsLock] = useState(false);

    const handleKeyPress = (key: string) => {
        onKeyPress(capsLock ? key : key.toLowerCase());
    };

    return (
        <div className='px-[3px] py-[7px] font-sans'>
            {/* top row */}
            <KeyboardRow
                keys={KEYBOARD_ROWS.top}
                onKeyPress={handleKeyPress}
                capsLock={capsLock}
            />
            {/* home row */}
            <div className='mt-3 px-4'>
                <KeyboardRow
                    keys={KEYBOARD_ROWS.home}
                    onKeyPress={handleKeyPress}
                    capsLock={capsLock}
                />
            </div>
            {/* bottom row */}
            <div className='mt-3 flex gap-[14px]'>
                <button
                    className='flex size-[42px] items-center justify-center rounded-md bg-[#AEB3BE] shadow'
                    onClick={() => {
                        setCapsLock((prev) => !prev);
                    }}
                >
                    <ArrowBigUp
                        size={24}
                        strokeWidth={1}
                        fill={capsLock ? 'black' : 'transparent'}
                    />
                </button>
                <div className='flex gap-[6px]'>
                    <KeyboardRow
                        keys={KEYBOARD_ROWS.bottom}
                        onKeyPress={handleKeyPress}
                        capsLock={capsLock}
                    />
                </div>
                <button
                    className='flex size-[42px] items-center justify-center rounded-md bg-[#AEB3BE] shadow'
                    onClick={onDelete}
                >
                    <Delete size={24} strokeWidth={1} />
                </button>
            </div>
            {/* number, space, dot, and go */}
            <div className='mt-3 flex gap-[6px]'>
                <button className='flex h-[42px] w-[91px] items-center justify-center rounded-md bg-[#AEB3BE] shadow'>
                    123
                </button>
                <button
                    className='flex h-[42px] flex-1 items-center justify-center rounded-md bg-white shadow'
                    onClick={onSpace}
                >
                    space
                </button>
                <button
                    className='flex h-[42px] w-[32px] items-center justify-center rounded-md bg-white shadow'
                    onClick={() => {
                        handleKeyPress('.');
                    }}
                >
                    <Dot size={24} />
                </button>
                <button
                    className='flex h-[42px] w-[63px] items-center justify-center rounded-md bg-[#007AFF] text-white shadow'
                    onClick={onEnter}
                >
                    go
                </button>
            </div>
        </div>
    );
};

export default Keyboard;
