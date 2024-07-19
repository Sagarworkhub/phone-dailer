export const KeyButton: React.FC<{
    keyChar: string;
    onClick: () => void;
    active: boolean;
}> = ({ keyChar, onClick, active }) => (
    <button
        className={`h-[42px] w-[31.5px] rounded-md bg-white p-1 pl-[9px] text-center text-base shadow ${active ? 'bg-gray-200' : ''}`}
        onClick={onClick}
    >
        {keyChar}
    </button>
);
