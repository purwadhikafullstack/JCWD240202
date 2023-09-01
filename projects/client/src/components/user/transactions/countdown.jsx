import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function Countdown({ expiredDate, countdownExpired }) {
    const parsedExpiredDate = new Date(expiredDate);
    const initialRemainingTime = parsedExpiredDate - Date.now();
    const [remainingTime, setRemainingTime] = useState(initialRemainingTime);
    const dispatch = useDispatch();
    useEffect(() => {
        const interval = setInterval(() => {
            if (remainingTime <= 1000) {
                countdownExpired();
                clearInterval(interval);
            } else {
                setRemainingTime((prevTime) =>
                    prevTime > 1000 ? prevTime - 1000 : 0,
                );
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [remainingTime, dispatch]);

    useEffect(() => {
        const updatedInitialRemainingTime = parsedExpiredDate - Date.now();
        setRemainingTime(updatedInitialRemainingTime);
    }, [expiredDate]);

    const formatTime = (timeInMilliseconds) => {
        const seconds = Math.floor((Number(timeInMilliseconds) / 1000) % 60);
        const minutes = Math.floor(
            (Number(timeInMilliseconds) / 1000 / 60) % 60,
        );
        const hours = Math.floor(
            (Number(timeInMilliseconds) / 1000 / 60 / 60) % 24,
        );
        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <div className="border-2 border-black p-1 flex gap-1 max-md:justify-center">
            <div className='max-md:hidden'>Expired in</div>
            <div className="font-bold">
                {remainingTime <= 0 ? 'Expired' : formatTime(remainingTime)}
            </div>
        </div>
    );
}
