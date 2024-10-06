import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";
import styles from "../style.module.css";
import style from "./styles.module.css";
import calender from "../../../assets/calendarIcon.svg";

import CalendarDiv from "./Calendar";
import { fetchNotificationData, updateNotificationData } from "../../../Redux/PushNotification/NotificationReducer";
import { useDispatch } from "react-redux";
import { message } from "antd";

const ChangeDate = ({ type, page, releaseDate, releaseTime, notificationId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedDate, setUpdatedDate] = useState(releaseDate);
  const [updatedTime, setUpdatedTime] = useState(releaseTime);
  const dispatch = useDispatch();

  const handleUpdateDate = () => {
    const updatedData = {
      notificationId,
      releaseDate: updatedDate,
      releaseTime: updatedTime,
    };
    dispatch(updateNotificationData(updatedData)).then(() => {
      dispatch(fetchNotificationData(type,"",page))
      onClose();
      message.success("Date/Time changed successfully");
    });
  };
  return (
    <>
      <span onClick={onOpen} className={styles.blackBtn2}>
        <img src={calender} alt="icon" /> Change Date
      </span>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <div className={styles.dateDiv}>
            <div>
              <CalendarDiv setUpdatedDate={setUpdatedDate} releaseDate={releaseDate}/>
              <div className={styles.btn}>
                <Button variant="outline " onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  onClick={handleUpdateDate}
                  bg="black"
                  color="#fff"
                >
                  Done
                </Button>
              </div>
            </div>
            <Input
              type="time"
              className={style.input}
              onChange={(e) => setUpdatedTime(e.target.value)}
              value={releaseTime}
            />
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangeDate;
