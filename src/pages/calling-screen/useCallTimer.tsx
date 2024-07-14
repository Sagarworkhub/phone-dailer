// hooks/useCallTimer.ts
import { useCallback, useRef, useState } from 'react';

export const useCallTimer = () => {
    const [seconds, setSeconds] = useState(0);
    const intervalRef = useRef<number | null>(null);

    const startTimer = useCallback(() => {
        if (intervalRef.current !== null) return;
        intervalRef.current = window.setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);
    }, []);

    const stopTimer = useCallback(() => {
        if (intervalRef.current === null) return;
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }, []);

    return { seconds, startTimer, stopTimer };
};
