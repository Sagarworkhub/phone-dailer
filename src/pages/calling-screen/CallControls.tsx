import { Button } from '~/components';

import { cn } from '~/utils/cn';

import { useAudioSettings } from './ueAudioSettings';

interface CallControlsProps {
    disconnecting: boolean;
    setIsNumberPadVisible: () => void;
}

export const CallControls: React.FC<CallControlsProps> = ({
    setIsNumberPadVisible,
    disconnecting,
}) => {
    const { audioSettings, toggleMute, toggleSpeaker } = useAudioSettings();
    return (
        <div className='grid grid-cols-3 gap-x-8 gap-y-6 px-12'>
            <ControlButton
                label='Mute'
                icon='/icons/mute.svg'
                disableIcon='/icons/muteFaded.svg'
                disabled={disconnecting}
                onClick={toggleMute}
                isActive={audioSettings.isMuted}
            />
            <ControlButton
                label='Keypad'
                icon='/icons/keypadGray.svg'
                disableIcon='/icons/keypadFaded.svg'
                disabled={disconnecting}
                onClick={setIsNumberPadVisible}
            />
            <ControlButton
                label='Speaker'
                icon='/icons/volumeUp.svg'
                disableIcon='/icons/volumeUpFaded.svg'
                disabled={disconnecting}
                onClick={toggleSpeaker}
                isActive={audioSettings.isSpeakerOn}
            />
            <ControlButton
                label='Message'
                icon='/icons/message.svg'
                disableIcon='/icons/messageFaded.svg'
                disabled={disconnecting}
                onClick={() => {
                    /* TODO: Implement messaging */
                }}
            />
            <div /> {/* Empty div for spacing */}
            <ControlButton
                label='Contacts'
                icon='/icons/contact.svg'
                disableIcon='/icons/contactFaded.svg'
                disabled={disconnecting}
                onClick={() => {
                    /* TODO: Implement contacts */
                }}
            />
        </div>
    );
};

interface ControlButtonProps {
    label: string;
    icon: string;
    disableIcon: string;
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
}

const ControlButton: React.FC<ControlButtonProps> = ({
    label,
    icon,
    onClick,
    disableIcon,
    isActive,
    disabled,
}) => (
    <div className='flex h-[96px] flex-col items-center gap-2'>
        <Button
            variant='numberPadPrimary'
            size='numberPad'
            onClick={onClick}
            className={cn(isActive && 'bg-[#48CAE4]')}
        >
            <img src={disabled ? disableIcon : icon} alt={label} />
        </Button>
        <p className='text-xs text-[#232323]'>{label}</p>
    </div>
);
