import { KeyButton } from '~components/keyboard/KeyButton';

export const KeyboardRow: React.FC<{
    keys: ReadonlyArray<string>;
    onKeyPress: (key: string) => void;
    capsLock: boolean;
}> = ({ keys, onKeyPress, capsLock }) => (
    <div className='flex gap-[6px]'>
        {keys.map((key) => (
            <KeyButton
                key={key}
                keyChar={capsLock ? key : key.toLowerCase()}
                onClick={() => {
                    onKeyPress(key);
                }}
                active={capsLock}
            />
        ))}
    </div>
);
