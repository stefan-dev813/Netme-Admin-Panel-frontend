/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import {
  AiOutlineMail,
  AiFillEyeInvisible,
  AiFillEye,
  AiFillUnlock,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";
import { message } from "antd";
import logo from "../../../assets/logo1.svg";
import { loginUser } from "../../../Redux/AuthReducer";
import Forget from "../Forget/Forget";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);
  const [show, setShow] = React.useState(false);
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [forgot, setForgot] = useState(false);

  const handleSubmit = () => {
    if (!email && !password) {
      message.error("Please enter email and password ");
    } else {
      if (!email) {
        message.error("Please enter email ");
      } else {
        if (!password) {
          message.error("Please enter Password");
        } else {
          dispatch(loginUser({ email, password }));
        }
      }
    }
  };
  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate("/Dashboard");
      window.location.reload();
    }
  }, [auth]);
  const handleClick = () => setShow(!show);

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <div className={styles.MainContainer}>
      <Helmet>
        <title>Admin login - NETME </title>
      </Helmet>
      ;
      <div className={styles.container}>
        <div>
          <h1>Welcome to </h1>
          <img src={logo} alt="" />
          <h1>Super admin Panel </h1>
        </div>
        <div>
          {!forgot ? (
            <div className={styles.formDiv}>
              <h2>Login into your account</h2>
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
                  onChange={(event) => setUsername(event.target.value)}
                  focusBorderColor="gray"
                />
              </InputGroup>
              <p className={styles.inputText}>Password</p>
              <InputGroup size="lg">
                <InputLeftElement
                  pointerEvents="none"
                  children={<AiFillUnlock color="gray" />}
                />
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  onKeyDown={handleEnterPress}
                  focusBorderColor="gray"
                />
                <InputRightElement width="4.5rem">
                  <p h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </p>
                </InputRightElement>
              </InputGroup>

              <Link onClick={() => setForgot(true)}>
                {" "}
                <p className={styles.forgetLink}>Forgot password?</p>
              </Link>
              <Button onClick={() => handleSubmit()}>Login</Button>
            </div>
          ) : (
            <>
              <Forget setForgot={setForgot} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
