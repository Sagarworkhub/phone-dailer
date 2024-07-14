// hooks/useAudioSettings.ts
import { useCallback, useState } from 'react';

interface AudioSettings {
    isMuted: boolean;
    isSpeakerOn: boolean;
}

export const useAudioSettings = () => {
    const [audioSettings, setAudioSettings] = useState<AudioSettings>({
        isMuted: false,
        isSpeakerOn: false,
    });

    const toggleMute = useCallback(() => {
        setAudioSettings((prevSettings) => {
            const isMuted = !prevSettings.isMuted;
            return {
                ...prevSettings,
                isMuted,
                isSpeakerOn: isMuted ? false : prevSettings.isSpeakerOn,
            };
        });
    }, []);

    const toggleSpeaker = useCallback(() => {
        setAudioSettings((prevSettings) => {
            const isSpeakerOn = !prevSettings.isSpeakerOn;

            return {
                ...prevSettings,
                isSpeakerOn,
                isMuted: isSpeakerOn ? false : prevSettings.isMuted,
            };
        });
    }, []);

    return {
        audioSettings,
        toggleMute,
        toggleSpeaker,
    };
};
