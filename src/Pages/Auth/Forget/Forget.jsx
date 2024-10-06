import React, { useState } from 'react'
import styles from "./styles.module.css"
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,

} from "@chakra-ui/react";
import { AiOutlineMail } from "react-icons/ai";
import Otp from './Otp/Otp';
import ResetPassword from './ResetPassword/ResetPassword';
import Success from './Success/Success';
import { message } from 'antd';
import { userRequest } from '../../../requestMethod';


const Forget = ({ setForgot }) => {
  const [current, setCurrent] = useState("")
  const [email, setEmail] = useState("")
  const sendOtp = () => {
    if (!email) {
      message.error("Please Enter Email")

    } else {
      userRequest.post('/api/util/sendOtp', { email, admin: true }).then((res) => {
        setCurrent("OTP")
        message.success(res.data.message)

      }).catch((err) => {
        // console.log('err:', err)
        message.error(err.response.data.message)
      })
    }
  }


  if (current === "OTP") {
    return (
      <Otp setCurrent={setCurrent} email={email} />
    )
  }
  if (current === "Reset") {
    return (
      <ResetPassword setCurrent={setCurrent} email={email}/>
    )
  }
  if (current === "Success") {
    return (
      <Success setCurrent={setCurrent} setForgot={setForgot} />
    )
  }
  return (
    <div className={styles.formDiv}>
      <h2>Reset Password</h2>
      <p className={styles.inputText}>Email id</p>
      <InputGroup size="lg">
        <InputLeftElement
          pointerEvents="none"
          children={<AiOutlineMail color="gray" />}
        />
        <Input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          focusBorderColor="gray"
        />
      </InputGroup>


      {/* <Link
                                    onClick={() =>
                                        setForgot(true)
                                    }
                                >
                                    {" "}
                                    <p className={styles.forgetLink}>Forgot password?</p>
                                </Link> */}
      <Button
        onClick={() => sendOtp()}
      >Send OTP</Button>
    </div >

  )
}

export default Forget