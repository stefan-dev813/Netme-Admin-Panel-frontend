import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Button, Input, Select } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
// import { createCurrentVoucherData, fetchCurrentVoucherData } from '../../../Redux/Voucher/CurrentVoucherReducer'
import { useDispatch } from "react-redux";
import { message } from "antd";
import { userRequest } from "../../../requestMethod";
import { fetchNotificationData, updateNotificationData } from "../../../Redux/PushNotification/NotificationReducer";
import pushIcon from "../../../assets/icons/pushIcon.svg"

const CreatePush = ({ setCreate, type, search, page }) => {
  const dispatch = useDispatch();
  const currentDate = new Date().toISOString().split("T")[0];
  const { id } = useParams();
  const [notification, setNotification] = useState([]);
  const [formattedReleaseDate, setFormattedReleaseDate] = useState("");
const navigate = useNavigate()
  useEffect(() => {
    if (id) {
      userRequest(`/api/notification/getNotificationbyId?_id=${id}`).then(
        (res) => {
          setNotification(res.data.data);
          const formattedDate = new Date(res.data.data?.releaseDate)
            .toISOString()
            .split("T")[0];
          setFormattedReleaseDate(formattedDate);
        }
      );
    }
  }, []);

  const handleSend = () => {
    const data = {
        notificationId:id,
        status:"Accepted"
    }
    dispatch(updateNotificationData(data)).then(() => {
      dispatch(fetchNotificationData(type,"",page))
      navigate('/Notification')
        message.success("Notification updated successfully");
      });
  }
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
            value={notification?.title}
            disabled
          />
          <p>Body*</p>
          <Input
            placeholder="Add Body (max. 150 characters)"
            value={notification?.body}
            disabled
          />
          <p>Select user type</p>
          <Select
            className={styles.selectPartner}
            border="none"
            outline="none"
            h={8}
            focusBorderColor="transparent"
            // onChange={(e) => {
            //   setReceiver(e.target.value);
            // }}

            placeholder="Choose Partner"
            value={notification?.type}
            disabled
          >
            {/* {partners.map((el) => {
              return (
                <option key={el.partnerId._id} value={el?.partnerId?._id}>
                  {el?.partnerId?.fullName + el?.partnerId?.lastName}
                </option>
              );
            })} */}
            <option value="USER">User</option>
            <option value="PARTNER">Partner</option>
          </Select>
          <p>Only Received by users in the following city:</p>
          <Input
            placeholder="City"
            type="text"
            value={notification?.cities}
            disabled
          />
          <div className={styles.dateDiv}>
            <p>Release on:</p>
            <Input
              type="date"
              min={currentDate}
              value={formattedReleaseDate}
              disabled
            />
            <Input type="time" value={notification?.releaseTime} disabled />
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
        <Button bg="black" color="#fff" variant="solid" w="127px" onClick={handleSend}>
          Send
        </Button>
      </div>
      <div className={styles.preview} >
          <p>Preview</p>
          <div className={styles.previewInner} >
            <span className={styles.spanIcon}>
              <img src={pushIcon} alt="" />
            </span>
            <h2>{notification?.title}</h2>
            <p>{notification?.body}</p>

          </div>



        </div>
      </div>
    </div>
  );
};

export default CreatePush;
