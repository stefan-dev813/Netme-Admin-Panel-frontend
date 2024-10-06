import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Button, Input, Select, CloseButton, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
// import { createCurrentVoucherData, fetchCurrentVoucherData } from '../../../Redux/Voucher/CurrentVoucherReducer'
import { useDispatch } from "react-redux";
import { message } from "antd";
import pushIcon from "../../../../assets/icons/pushIcon.svg";
import { userRequest } from "../../../../requestMethod";
import {
  createUserNotificationData,
  fetchUserNotificationData,
} from "../../../../Redux/User/UserNotificationReducer";

const initialState = {
  name: "",
  code: "",
  percentage: "",
  startDate: "",
  endDate: "",
};

const CreateNotification = ({ type, page, setCreate }) => {
  const dispatch = useDispatch();
  const initialState = {
    name: "Admin",
    title: "",
    body: "",
    type: "USER",
    // sendTo: "All",
    userType: "",
    cities: [],
    releaseDate: "",
    releaseTime: "",
  };
  const [form, setForm] = useState(initialState);
  const currentDate = new Date().toISOString().split("T")[0];

  const addData = () => {
    if (!form.title) {
      message.error("Enter title");
    } else if (!form.body) {
      message.error("Body cann't be empty");
    } else if (!form.cities) {
      message.error("Select cities");
    } else if (!form.releaseDate) {
      message.error("Select releaseDate");
    } else if (!form.releaseTime) {
      message.error("Select releaseTime");
    }else {
      dispatch(createUserNotificationData(form))
        .then((data) => {
          console.log("Success:", data);  // Log success data
          dispatch(fetchUserNotificationData(type, "", page));
          setCreate(false);
          message.success("Notification created successfully");
        })
        .catch((error) => {
          console.log("Error:", error);  // Log error message
          message.error(`Error creating notification: ${error}`);
        });
    }
  };

  const addCity = () => {
    if (form.city && !form.cities.includes(form.city)) {
      setForm((prevForm) => ({
        ...prevForm,
        cities: [...prevForm.cities, prevForm.city],
        city: "",
      }));
    }
  };

  const removeCity = (removedCity) => {
    setForm({
      ...form,
      cities: form.cities.filter((city) => city !== removedCity),
    });
  };

  return (
    <div className={styles.MainContainer}>
      <div className={styles.container1}>
        <span>
          All Notifications {">"}{" "}
          <b style={{ opacity: "100%", color: "#131313" }}>
            Create New Notification
          </b>
        </span>
        <h1>Create New Notification</h1>

        <div className={styles.resetPassword}>
          <p>Title*</p>
          <Input
            placeholder="Title (max. 50 characters)"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <p>Body*</p>
          <textarea
            placeholder="Add Body (max. 150 characters)"
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
          />
          <p>Select user type</p>
          <Select
            placeholder="Choose User"
            isReadOnly
            onChange={(e) => setForm({ ...form, userType: e.target.value })}
          >
            <option value="ALL_USER">All</option>
            <option value="STANDARD">Standard</option>
            <option value="PREMIUM">Premium</option>
          </Select>
          <p>Only Received by users in the following city:</p>
          <div className={styles.citydiv}>
            <div className={styles.scrollstack}>
              <Stack direction="row" spacing={2} align="center">
                {form.cities.map((city) => (
                  <div key={city} className={styles.selectedCity}>
                    <p>{city}</p>
                    <CloseButton onClick={() => removeCity(city)} />
                  </div>
                ))}
              </Stack>
            </div>
            <input
              placeholder="City"
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && addCity()}
              onBlur={addCity}
            />
          </div>
          <div className={styles.dateDiv}>
            <p>Release on:</p>
            <Input
              type="date"
              min={currentDate}
              onChange={(e) =>
                setForm({ ...form, releaseDate: e.target.value })
              }
            />
            <Input
              type="time"
              onChange={(e) =>
                setForm({ ...form, releaseTime: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      <div className={styles.container2}>
        <div className={styles.btn}>
          <Button
            colorScheme="black"
            variant="outline"
            w="127px"
            onClick={() => setCreate(false)}
          >
            Cancel
          </Button>
          <Button
            bg="black"
            color="#fff"
            variant="solid"
            w="127px"
            onClick={addData}
          >
            Save
          </Button>
        </div>
        <div className={styles.preview}>
          <p>Preview</p>
          <div className={styles.previewInner}>
            <span className={styles.spanIcon}>
              <img src={pushIcon} alt="" />
            </span>
            <h2>{form.title}</h2>
            <p>{form.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNotification;
