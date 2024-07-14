import { useState } from 'react';

import { Button, Footer, NumberPad } from '~/components';

import { InputArea } from './input-area';

export const Dialer: React.FC = () => {
    const [selectedCountryCode, setSelectedCountryCode] = useState('+1');

    const [phoneNumber, setPhoneNumber] = useState<string>('');

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='flex h-16 w-full items-center justify-end px-5'>
                <Button>Get a number</Button>
            </div>
            <InputArea
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                selectedCountryCode={selectedCountryCode}
                setSelectedCountryCode={setSelectedCountryCode}
            />
            <div className='w-full py-[60px]'>
                <NumberPad
                    showOptions
                    selectedCountryCode={selectedCountryCode}
                    phoneNumber={phoneNumber}
                    onClick={(digit: string): void => {
                        setPhoneNumber((prevNumber) => {
                            return `${prevNumber}${digit}`;
                        });
                    }}
                />
            </div>
            <Footer />
        </div>
    );
};
