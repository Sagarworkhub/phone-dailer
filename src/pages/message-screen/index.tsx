import {
    ChevronLeft,
    ChevronRight,
    Paperclip,
    SendHorizontal,
    UserRoundPlus,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import Keyboard from '~/components/keyboard';

export const MessageScreen = () => {
    const [fromInput, setFromInput] = useState('');
    const [toInput, setToInput] = useState('');
    const [messageInput, setMessageInput] = useState('');
    const [focusedInput, setFocusedInput] = useState<
        'fromInput' | 'toInput' | 'messageInput' | null
    >(null);

    const keyboardRef = useRef<HTMLDivElement>(null);
    const fromInputRef = useRef<HTMLInputElement>(null);
    const toInputRef = useRef<HTMLInputElement>(null);
    const messageInputRef = useRef<HTMLInputElement>(null);

    const inputs = { fromInput, toInput, messageInput };
    const inputSetters = {
        fromInput: setFromInput,
        toInput: setToInput,
        messageInput: setMessageInput,
    };
    const inputRefs = {
        fromInput: fromInputRef,
        toInput: toInputRef,
        messageInput: messageInputRef,
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const inputRefs = {
                fromInput: fromInputRef,
                toInput: toInputRef,
                messageInput: messageInputRef,
            };

            const isInputClick = Object.values(inputRefs).some((ref) =>
                ref.current?.contains(event.target as Node),
            );
            const isKeyboardClick = keyboardRef.current?.contains(
                event.target as Node,
            );

            if (!isInputClick && !isKeyboardClick) {
                setFocusedInput(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputChange =
        (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setter(e.target.value);
        };

    const handleInputFocus =
        (inputName: 'fromInput' | 'toInput' | 'messageInput') => () => {
            setFocusedInput(inputName);
        };

    const handleKeyPress = (key: string) => {
        if (focusedInput) {
            const setter = inputSetters[focusedInput];
            setter((prev) => prev + key);
        }
    };

    const handleDelete = () => {
        if (focusedInput) {
            const setter = inputSetters[focusedInput];
            setter((prev) => prev.slice(0, -1));
        }
    };

    const handleSpace = () => {
        if (focusedInput) {
            const setter = inputSetters[focusedInput];
            setter((prev) => prev + ' ');
        }
    };

    const getInputProps = (
        inputName: 'fromInput' | 'toInput' | 'messageInput',
    ) => ({
        value: inputs[inputName],
        onChange: handleInputChange(inputSetters[inputName]),
        onFocus: handleInputFocus(inputName),
        ref: inputRefs[inputName],
        type: 'text',
    });

    return (
        <div className='flex h-full flex-1 flex-col'>
            {/* header area */}
            <div className='flex h-[82px] items-center gap-2 px-6 pb-8 pt-[18px]'>
                <button>
                    <ChevronLeft size={24} />
                </button>
                <span className='text-base font-medium'>New Message</span>
            </div>
            {/* Send from area */}
            <div className='flex h-[52px] items-center gap-2 border-t-2 px-6'>
                <div className='text-[#5E5E5E]'>Send from:</div>
                <input
                    className='w-[202px]'
                    {...getInputProps('fromInput')}
                ></input>
                <button>
                    <ChevronRight size={24} color='#7C7C7C' />
                </button>
            </div>
            {/* Send To area */}
            <div className='flex h-[52px] items-center gap-2 border-y-2 px-6'>
                <div className='text-[#5E5E5E]'>To:</div>
                <input
                    className='w-[262px]'
                    {...getInputProps('toInput')}
                ></input>
                <button>
                    <UserRoundPlus size={24} color='#7C7C7C' />
                </button>
            </div>
            {/* dummy chat area */}
            <div className='flex-1'></div>
            {/* dummy input area */}
            <div className='flex h-16 items-center gap-3 border-t-2 px-[18px]'>
                <button>
                    <Paperclip size={24} strokeWidth={1} />
                </button>
                <input
                    placeholder='Type a message'
                    className='flex h-[40px] w-[250px] items-center rounded-xl bg-[#F5F5F5] px-[18px] text-[#5E5E5E] placeholder:text-[#5E5E5E]'
                    {...getInputProps('messageInput')}
                ></input>
                <button className='flex size-[40px] items-center justify-center rounded-full bg-[#B9FF66]'>
                    <SendHorizontal size={24} strokeWidth={1} />
                </button>
            </div>
            {/* keyboard */}
            {focusedInput && (
                <div ref={keyboardRef} className='h-[212px] bg-[#D4D6DC]'>
                    <Keyboard
                        onKeyPress={handleKeyPress}
                        onDelete={handleDelete}
                        onSpace={handleSpace}
                    />
                </div>
            )}
            <div className='bg-[#D4D6DC]'>
                <img src='/icons/message-footer.svg' alt='Message footer' />
            </div>
        </div>
    );
};

export default MessageScreen;
