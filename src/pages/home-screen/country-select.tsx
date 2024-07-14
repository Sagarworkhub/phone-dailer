import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '~/components/select';

const countries = [
    {
        name: 'United States',
        code: '+1',
        id: 'US',
        flag: '🇺🇸',
    },
    {
        name: 'United Kingdom',
        code: '+44',
        id: 'GB',
        flag: '🇬🇧',
    },
    {
        name: 'Australia',
        code: '+61',
        id: 'AU',
        flag: '🇦🇺',
    },
    {
        name: 'Germany',
        code: '+49',
        id: 'DE',
        flag: '🇩🇪',
    },
    {
        name: 'France',
        code: '+33',
        id: 'FR',
        flag: '🇫🇷',
    },
    {
        name: 'Japan',
        code: '+81',
        id: 'JP',
        flag: '🇯🇵',
    },
    {
        name: 'Italy',
        code: '+39',
        id: 'IT',
        flag: '🇮🇹',
    },
    {
        name: 'Brazil',
        code: '+55',
        id: 'BR',
        flag: '🇧🇷',
    },
    {
        name: 'India',
        code: '+91',
        id: 'IN',
        flag: '🇮🇳',
    },
    {
        name: 'Russia',
        code: '+7',
        id: 'RU',
        flag: '🇷🇺',
    },
    {
        name: 'China',
        code: '+86',
        id: 'CN',
        flag: '🇨🇳',
    },
    {
        name: 'South Korea',
        code: '+82',
        id: 'KR',
        flag: '🇰🇷',
    },
    {
        name: 'Mexico',
        code: '+52',
        id: 'MX',
        flag: '🇲🇽',
    },
    {
        name: 'Spain',
        code: '+34',
        id: 'ES',
        flag: '🇪🇸',
    },
    {
        name: 'Netherlands',
        code: '+31',
        id: 'NL',
        flag: '🇳🇱',
    },
];

export interface CountrySelectProps {
    value: string;
    onChange: (value: string) => void;
}
export const CountrySelect: React.FC<CountrySelectProps> = ({
    value,
    onChange,
}) => {
    return (
        <Select
            value={value}
            onValueChange={(value) => {
                onChange(value);
            }}
        >
            <SelectTrigger className='mr-4 w-16'>
                <SelectValue placeholder='Select a Country' />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Countries</SelectLabel>
                    {countries.map((country) => (
                        <SelectItem key={country.id} value={country.code}>
                            {country.flag}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default CountrySelect;
