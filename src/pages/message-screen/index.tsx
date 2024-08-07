import {
    ChevronLeft,
    ChevronRight,
    Paperclip,
    SendHorizontal,
    UserRoundPlus,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Keyboard from '~/components/keyboard';
import TagInput from '~/components/tag-input';

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

    const navigate = useNavigate();

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
        if (!focusedInput) return;
        const setter = inputSetters[focusedInput];
        setter((prev) => prev + key);
    };

    const handleDelete = () => {
        if (!focusedInput) return;
        const setter = inputSetters[focusedInput];
        setter((prev) => {
            if (prev.length > 0) {
                return prev.slice(0, -1);
            }

            if (focusedInput === 'fromInput' || focusedInput === 'toInput') {
                const ref = inputRefs[focusedInput];
                if (ref.current) {
                    const event = new KeyboardEvent('keydown', {
                        key: 'Backspace',
                        code: 'Backspace',
                        keyCode: 8,
                        charCode: 8,
                        bubbles: true,
                    });
                    ref.current.dispatchEvent(event);
                }
            }

            return prev;
        });
    };

    const handleSpace = () => {
        if (!focusedInput) return;
        const setter = inputSetters[focusedInput];
        setter((prev) => prev + ' ');
    };

    const handleEnter = () => {
        if (!focusedInput) return;

        const ref = inputRefs[focusedInput];

        if (!ref.current) return;

        if (focusedInput === 'messageInput') {
            setMessageInput((prev) => prev + '\n');
            return;
        }

        const event = new KeyboardEvent('keydown', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            charCode: 13,
            bubbles: true,
        });

        ref.current.dispatchEvent(event);
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
                <button
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    <ChevronLeft size={24} />
                </button>
                <span className='text-base font-medium'>New Message</span>
            </div>

            {/* Send from area */}
            <div className='flex h-[52px] items-center gap-2 border-t-2 px-6'>
                <div className='text-[#5E5E5E]'>Send from:</div>
                <TagInput
                    {...getInputProps('fromInput')}
                    setValue={setFromInput}
                    maxLength={1}
                    className='w-[202px]'
                />
                <button>
                    <ChevronRight size={24} color='#7C7C7C' />
                </button>
            </div>

            {/* Send To area */}
            <div className='flex min-h-[52px] items-start gap-2 border-y-2 px-6'>
                <div className='mt-[13px] text-[#5E5E5E]'>To:</div>
                <TagInput {...getInputProps('toInput')} setValue={setToInput} />
                <button className='mt-[13px]'>
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
                />
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
                        onEnter={handleEnter}
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
