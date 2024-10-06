import React, { useState } from 'react'
import {
    Button,
    PinInput,
    PinInputField,

} from "@chakra-ui/react";
import styles from "./styles.module.css"
import { message } from 'antd';
import { userRequest } from '../../../../requestMethod';
import OtpCountdown from './Timer';

const Otp = ({ setCurrent, email }) => {
    const [countdown, setCountdown] = useState(1 * 60 + 0);
    const [resend, setResend] = useState(true)
    const [otp, setOtp] = useState(null)
    console.log('otp:', otp)

    const verify = () => {
        userRequest.post('/api/util/verifyOtp', {
            email,
            otp,
            admin: true
        }).then((res) => {
            setCurrent("Reset")
            message.success(res.data.message)

        }
        ).catch((err) => {
            message.error(err.response.data.error)
        })

    }


    const sendOtp = () => {
        if (!email) {
            message.error("Please Enter Email")

        } else {
            userRequest.post('/api/util/sendOtp', { email, admin: true }).then((res) => {
                setCurrent("OTP")
                message.success("Otp sent")

            }).catch((err) => {
                // console.log('err:', err)
                message.error(err.response.data.message)
            })
        }
    }
    const restartCountDown = () => {
        setResend(true)
        setCountdown(1 * 60 + 0)
        sendOtp()
    }
    return (
        <div className={styles.formDiv}>
            <h2>Enter OTP</h2>
            <div className={styles.otpDiv} >
                <PinInput otp mask size="lg" placeholder=' ' onChange={(e) => setOtp(e)}>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                </PinInput>
            </div>
            <div className={styles.pDiv}>
                <p>We have sent OTP to your registered email address</p>
                <p><u>{email}</u></p>
                <p onClick={() => setCurrent("")} style={{ cursor: "pointer" }}>Change email address</p>
                <p><OtpCountdown setCountdown={setCountdown} countdown={countdown} setResend={setResend} /></p>
                <p>didn’t received OTP?</p>
                <Button variant='ghost' isDisabled={resend} _hover={{
                    bg: "transparent"
                }} className={styles.resend} onClick={restartCountDown}>Resend</Button>

            </div>


            {/* <Link
                onClick={() =>
                    setForgot(true)
                }
            >
                {" "}
                <p className={styles.forgetLink}>Forgot password?</p>
            </Link> */}
            <Button
                onClick={() => verify()}
            >Verify</Button>
        </div>

    )
}

export default Otp