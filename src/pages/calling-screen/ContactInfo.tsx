interface ContactInfoProps {
    phoneNumber: string;
    callStatus: 'connecting' | 'connected' | 'disconnected' | 'incoming';
    callDuration?: string;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({
    phoneNumber,
    callStatus,
    callDuration,
}) => {
    return (
        <div className='mb-10 mt-5 flex flex-col items-center'>
            <img
                src='/icons/defaultContact.svg'
                alt='contact'
                className='size-20'
            />
            {callStatus === 'incoming' ? (
                <p className='my-2 text-center'>Call from</p>
            ) : null}
            {callStatus === 'connected' ? (
                <p className='my-2 text-center'>{callDuration}</p>
            ) : null}
            {callStatus === 'disconnected' ? (
                <p className='my-2 text-center'>Call ended</p>
            ) : null}
            {callStatus === 'connecting' ? (
                <p className='my-2 text-center'>Connecting...</p>
            ) : null}
            <p className='text-xl'>{phoneNumber}</p>
            <p className='text-[#4F4F4F]'>Houston, TX</p>
        </div>
    );
};
