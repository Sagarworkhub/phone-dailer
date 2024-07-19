import { ArrowBigUp, Delete, Dot } from 'lucide-react';
import { useState } from 'react';

interface KeyboardProps {
    onKeyPress: (key: string) => void;
    onDelete: () => void;
    onSpace: () => void;
}

const KEYBOARD_TOP_ROW = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
] as const;
const KEYBOARD_HOME_ROW = [
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
] as const;
const KEYBOARD_BOTTOM_ROW = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'] as const;

const Keyboard: React.FC<KeyboardProps> = ({
    onKeyPress,
    onDelete,
    onSpace,
}) => {
    const [capsLock, setCapsLock] = useState(false);

    return (
        <div className='px-[3px] py-[7px] font-sans'>
            {/* top row */}
            <div className='flex gap-[6px]'>
                {KEYBOARD_TOP_ROW.map((key) => (
                    <button
                        key={key}
                        className='h-[42px] w-[31.5px] rounded-md bg-white p-1 pl-[9px] text-center text-base shadow'
                        onClick={() => {
                            onKeyPress(capsLock ? key : key.toLowerCase());
                        }}
                    >
                        {capsLock ? key : key.toLowerCase()}
                    </button>
                ))}
            </div>
            {/* home row */}
            <div className='mt-3 flex gap-[6px] px-4'>
                {KEYBOARD_HOME_ROW.map((key) => (
                    <button
                        key={key}
                        className='h-[42px] w-[31.5px] rounded-md bg-white p-1 pl-[9px] text-center text-base shadow'
                        onClick={() => {
                            onKeyPress(capsLock ? key : key.toLowerCase());
                        }}
                    >
                        {capsLock ? key : key.toLowerCase()}
                    </button>
                ))}
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
                    {KEYBOARD_BOTTOM_ROW.map((key) => (
                        <button
                            key={key}
                            className='h-[42px] w-[31.5px] rounded-md bg-white p-1 pl-[9px] text-center text-base shadow'
                            onClick={() => {
                                onKeyPress(capsLock ? key : key.toLowerCase());
                            }}
                        >
                            {capsLock ? key : key.toLowerCase()}
                        </button>
                    ))}
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
                    className='flex h-[42px] w-[32px] flex-1 items-center justify-center rounded-md bg-white shadow'
                    onClick={onSpace}
                >
                    space
                </button>
                <button
                    className='flex h-[42px] w-[32px] items-center justify-center rounded-md bg-white shadow'
                    onClick={() => {
                        onKeyPress('.');
                    }}
                >
                    <Dot size={24} />
                </button>
                <button
                    className='flex h-[42px] w-[63px] items-center justify-center rounded-md bg-[#007AFF] text-white shadow'
                    onClick={onDelete}
                >
                    go
                </button>
            </div>
        </div>
    );
};

export default Keyboard;
