import {
    forwardRef,
    type KeyboardEvent,
    useEffect,
    useRef,
    useState,
} from 'react';

import { cn } from '~/utils/cn';

import { TagItem } from './tag-item';
import { type Tag } from './types';

export interface TagInputProps {
    type: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus: () => void;

    maxLength?: number;
    className?: string;
}

export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
    (
        {
            type,
            value,
            setValue,
            onChange,
            onFocus,
            maxLength = Infinity,
            className,
        },
        inputRef,
    ) => {
        const [tags, setTags] = useState<Array<Tag>>([]);
        const containerRef = useRef<HTMLDivElement>(null);

        const addTag = (text: string) => {
            if (text.trim() !== '' && tags.length < maxLength) {
                setTags([
                    ...tags,
                    { id: Date.now().toString(), text: text.trim() },
                ]);
                setValue('');
            }
        };

        // Function to remove a tag from the list by its id
        const removeTag = (id: string) => {
            setTags(tags.filter((tag) => tag.id !== id));
        };

        // Handle key down events in the input field
        const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addTag(value);
            } else if (
                e.key === 'Backspace' &&
                value === '' &&
                tags.length > 0
            ) {
                removeTag(tags[tags.length - 1].id);
            }
        };

        // Focus the input field whenever the tags change
        useEffect(() => {
            (
                inputRef as React.MutableRefObject<HTMLInputElement | null>
            ).current?.focus();
        }, [inputRef, tags]);

        return (
            <div
                ref={containerRef}
                className={cn(
                    'mt-[5px] flex min-h-[32px] w-[262px] flex-wrap items-center gap-2 p-2',
                    className,
                )}
                onClick={() =>
                    (
                        inputRef as React.MutableRefObject<HTMLInputElement | null>
                    ).current?.focus()
                }
            >
                {/* Render the first 10 tags */}
                {tags.slice(0, 10).map((tag) => (
                    <TagItem key={tag.id} tag={tag} onRemove={removeTag} />
                ))}

                {/* Display a message if there are more than 10 tags */}
                {tags.length > 10 && (
                    <div className='flex items-center rounded-lg border border-[#E0E0E0] bg-[#FBFBFB] px-2 py-1 text-sm text-[#5E5E5E]'>
                        & {tags.length - 10} more
                    </div>
                )}

                {/* Input field for adding new tags */}
                {tags.length < maxLength ? (
                    <input
                        ref={inputRef}
                        type={type}
                        value={value}
                        onChange={onChange}
                        onFocus={onFocus}
                        onKeyDown={handleKeyDown}
                        placeholder={
                            tags.length === 0 ? 'Type to add tags' : ''
                        }
                        className='min-w-[60px] grow outline-none'
                    />
                ) : null}
            </div>
        );
    },
);

TagInput.displayName = 'TagInput';

export default TagInput;
