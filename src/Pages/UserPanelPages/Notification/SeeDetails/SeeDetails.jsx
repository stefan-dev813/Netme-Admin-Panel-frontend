import React, { useEffect, useState } from 'react'
import styles from "./style.module.css"
import { Input, Select } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { userRequest } from '../../../../requestMethod'
import pushIcon from "../../../../assets/icons/pushIcon.svg"

const SeeDetails = ({ setCreate }) => {
  const navigate = useNavigate()
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
          <span onClick={()=>navigate('/NotificationUser')} style={{cursor:"pointer"}}>All Notifications</span> {'>'} <b style={{ opacity: "100%", color: "#131313" }}>Notification Details</b>
        </span>
        <h1>
          Notification Details
        </h1>

        <div className={styles.resetPassword}>
          <p>Title*</p>
          <Input isDisabled value={notification?.title} />
          <p>Body*</p>
          <Input isDisabled   value={notification?.body}/>
          <p>Select user type</p>
          <Select isDisabled value={notification?.type} placeholder='Users'>
          </Select>
          <p>Only Received by users in the following city:</p>
          <Input isDisabled  value={notification?.cities}/>
          <div className={styles.dateDiv}>
            <p>Release on:</p>
            <Input isDisabled type='date' value={formattedReleaseDate}/>
            <Input  isDisabled type='time' value={notification?.releaseTime}/>
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
  )
}

export default SeeDetails