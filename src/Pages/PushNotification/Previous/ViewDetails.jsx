import React, { useEffect, useState } from "react";
import styles from "../CreateNotification/style.module.css";
import { Input, Select } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { userRequest } from "../../../requestMethod";
import pushIcon from "../../../assets/icons/pushIcon.svg"

const ViewPushDetails = ({ setCreate, type, search, page }) => {
  const currentDate = new Date().toISOString().split("T")[0];
  const { id } = useParams();
  const [notification, setNotification] = useState([]);
  const [formattedReleaseDate, setFormattedReleaseDate] = useState("");

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

  return (
    <div className={styles.MainContainer}>
      <div className={styles.container1}>
        <span>
          Previous Notifications {">"}{" "}
          <b style={{ opacity: "100%", color: "#131313" }}>
            Details
          </b>
        </span>
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
            placeholder="Choose Partner"
            value={notification?.type}
            disabled
          >
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

export default ViewPushDetails;
