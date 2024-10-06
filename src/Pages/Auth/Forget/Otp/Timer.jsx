import React, {  useEffect } from "react";

const OtpCountdown = ({ setCountdown, countdown, setResend }) => {

    useEffect(() => {
        let interval;
        if (countdown > 0) {
            interval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [countdown,setCountdown]);

    useEffect(() => {
        if (countdown === 0) {
            setResend(false)
        }
    }, [countdown,setResend]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    return (
        <div>

            <p> {formatTime(countdown)}</p>

        </div>
    );
};

export default OtpCountdown;
