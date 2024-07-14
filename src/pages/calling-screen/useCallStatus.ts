import { useCallback, useState } from 'react';

type CallStatus = 'connecting' | 'connected' | 'disconnected';

export const useCallStatus = () => {
    const [callStatus, setCallStatus] = useState<CallStatus>('connecting');

    const updateCallStatus = useCallback((newStatus: CallStatus) => {
        setCallStatus(newStatus);
    }, []);

    return { callStatus, setCallStatus: updateCallStatus };
};
