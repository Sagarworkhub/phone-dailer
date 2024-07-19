import { X } from 'lucide-react';

import { type Tag } from './types';

export const TagItem: React.FC<{
    tag: Tag;
    onRemove: (id: string) => void;
}> = ({ tag, onRemove }) => (
    <div className='flex items-center rounded-lg border border-[#E0E0E0] bg-[#FBFBFB] px-2 py-1 text-sm text-[#5E5E5E]'>
        <span className='max-w-[200px] truncate'>{tag.text}</span>
        <button
            onClick={() => {
                onRemove(tag.id);
            }}
            className='ml-1 text-gray-600 hover:text-gray-800'
        >
            <X size={14} />
        </button>
    </div>
);
