import { cn } from '~/utils/cn';

interface CustomButtonProps {
    numberKey?: string | number;
    subKey?: string;
    icon?: string;
    onClickHandler: () => void;
    backGroundColor: string;
    type: 'key' | 'action';
}

export const CustomButton: React.FC<CustomButtonProps> = ({
    numberKey,
    subKey,
    icon,
    onClickHandler,
    backGroundColor = '',
    type,
}) => {
    return (
        <div className='flex items-center justify-center'>
            <button
                type='button'
                onClick={onClickHandler}
                className={cn(
                    'size-20 rounded-full p-2 text-black',
                    backGroundColor,
                )}
            >
                {type === 'key' ? (
                    <div className='flex flex-col items-center justify-center text-3xl'>
                        {numberKey}
                        {subKey ? (
                            <span className='text-xs'>{subKey}</span>
                        ) : null}
                        {icon ? (
                            <img src={icon} className='w-4' alt='' />
                        ) : null}
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center gap-2 text-black'>
                        {icon ? <img src={icon} alt={subKey ?? ''} /> : null}
                        {subKey ? (
                            <span className='text-xs'>{subKey}</span>
                        ) : null}
                    </div>
                )}
            </button>
        </div>
    );
};
