import React, {  useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { AiFillEyeInvisible, AiFillEye, AiFillUnlock } from "react-icons/ai";

import styles from "./styles.module.css";
import { message } from "antd";
import { publicRequest } from "../../../../requestMethod";

const ResetPassword = ({ setCurrent, email }) => {
  const [show, setShow] = React.useState(false);
  const [show1, setShow1] = React.useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleSubmit = () => {
    if (!newPassword) {
      message.error("Please enter new password")
    } else {
      if (!confirmPassword) {
        message.error("Please enter confirm password ")
      } else {
        if (newPassword !== confirmPassword) {
          message.error("Password mismatch")
        } else {
          publicRequest.put('api/authAdmin/forgotPassword', { email, password: newPassword }).then((res) => {
            setCurrent("Success")
            message.success(res.data.message)
          }).catch((err) => {
            message.error(err.response.data.message)
          })

        }
      }
    }

  };
 
  const handleClick = () => setShow(!show);
  const handleClick1 = () => setShow1(!show1);

  const handleEnterPress = (event) => {
    if (event.key === 'Enter') {

      handleSubmit()
    }
  };
  return (

    <div className={styles.formDiv}>
      <h2>Reset Password</h2>
      <p className={styles.inputText}>Enter new password</p>
      <InputGroup size="lg" mb={30}>
        <InputLeftElement
          pointerEvents="none"
          children={<AiFillUnlock color="gray" />}
        />
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Enter new password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          onKeyDown={handleEnterPress}
          focusBorderColor="gray"

        />
        <InputRightElement width="4.5rem">
          <p h="1.75rem" size="sm" onClick={handleClick}>
            {show ? <AiFillEye /> : <AiFillEyeInvisible />}
          </p>
        </InputRightElement>
      </InputGroup>
      <p className={styles.inputText}>Confirm new password</p>
      <InputGroup size="lg">
        <InputLeftElement
          pointerEvents="none"
          children={<AiFillUnlock color="gray" />}
        />
        <Input
          pr="4.5rem"
          type={show1 ? "text" : "password"}
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          onKeyDown={handleEnterPress}
          focusBorderColor="gray"

        />
        <InputRightElement width="4.5rem">
          <p h="1.75rem" size="sm" onClick={handleClick1}>
            {show1 ? <AiFillEye /> : <AiFillEyeInvisible />}
          </p>
        </InputRightElement>
      </InputGroup>


      <Button onClick={() => handleSubmit()}>Confirm password</Button>
    </div>


  );
};

export default ResetPassword;
