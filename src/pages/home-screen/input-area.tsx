import { CountrySelect } from './country-select';

export interface InputAreaProps {
    selectedCountryCode: string;
    setSelectedCountryCode: React.Dispatch<React.SetStateAction<string>>;

    phoneNumber: string;
    setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
}

export const InputArea: React.FC<InputAreaProps> = ({
    selectedCountryCode,
    setSelectedCountryCode,
    phoneNumber,
    setPhoneNumber,
}) => {
    const onBackspace = () => {
        setPhoneNumber((prevNumber) => {
            return prevNumber.slice(0, -1);
        });
    };
    return (
        <div className='h-20 w-full px-5 py-2'>
            <div className='flex items-center'>
                <CountrySelect
                    value={selectedCountryCode}
                    onChange={(value) => {
                        setSelectedCountryCode(value);
                    }}
                />
                <span className='text-base font-medium'>
                    {selectedCountryCode}
                    {phoneNumber ? '-' : ''}
                </span>
                <input
                    type='tel'
                    value={phoneNumber}
                    onChange={(e) => {
                        setPhoneNumber(e.target.value);
                    }}
                    className='w-3/5 grow text-base font-medium focus:outline-none'
                />
                <button type='button' onClick={onBackspace}>
                    <img src={'/icons/backspace.svg'} alt='backspace' />
                </button>
            </div>
            <div className='mt-2 flex items-center justify-center'>
                <button type='button' className='text-[#57B100]'>
                    Add to contact
                </button>
            </div>
        </div>
    );
};

export default InputArea;
