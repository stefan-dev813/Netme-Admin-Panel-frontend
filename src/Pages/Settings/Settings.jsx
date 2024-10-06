import React, { useState } from "react";
import styles from "./styles.module.css";
import { Input, Select, Switch } from "@chakra-ui/react";
import { Button } from "antd";
import { message } from "antd";
import { userRequest } from "../../requestMethod";
import { Helmet } from "react-helmet";
const initialState = {
  old: "",
  new: "",
  confirm: "",
};
const Settings = () => {
  const [form, setForm] = useState(initialState);

  console.log("form:", form);
  const setPassword = () => {
    if (!form.old) {
      message.error("Old Password is required");
    } else {
      if (!form.new) {
        message.error("New Password is required");
      } else {
        if (!form.confirm) {
          message.error("Confirm Password is required");
        } else {
          if (form.new !== form.confirm) {
            message.error("Password Mismatch");
          } else {
            userRequest
              .put("/api/userAdmin/forgotPassword", {
                oldPassword: form.old,
                password: form.new,
              })
              .then(() => {
                message.success("Password Updated");
                setForm(initialState);
              })
              .catch((error) => {
                console.log("error:", error);

                message.error(error?.response?.data?.message);
              });
          }
        }
      }
    }
  };
  return (
    <div className={styles.mainContainer}>
      <Helmet>
        <title> Settings - NETME</title>
      </Helmet>
      <h1>Settings</h1>
      <div className={styles.container}>
        <div>
          <Select>
            <option value="">Change Password</option>
          </Select>
          <div className={styles.toggle}>
            <p>Website Panel Notification</p>
            <Switch />
          </div>
        </div>
        <div className={styles.resetPassword}>
          <p>Old Password</p>
          <Input
            placeholder="Enter Old Password"
            type="password"
            onChange={(e) => setForm({ ...form, old: e.target.value })}
            value={form.old}
          />
          <p>New Password</p>
          <Input
            placeholder="Enter new Password"
            type="password"
            onChange={(e) => setForm({ ...form, new: e.target.value })}
            value={form.new}
          />
          <p>Confirm Password</p>
          <Input
            placeholder="Confirm Your Password"
            type="password"
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            value={form.confirm}
          />
          <Button className={styles.submit} onClick={setPassword}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
