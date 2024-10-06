import React, { useEffect, useRef } from "react";
import styles from "./style.module.css";
import { Link, useLocation } from "react-router-dom";
import { BsDownload } from "react-icons/bs";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../../../Firebase_config";
import blue from "../../../../assets/usersDashboard/blue.png";
import white from "../../../../assets/usersDashboard/white.svg";
const Message = ({ message }) => {
  const id = JSON.parse(localStorage.getItem("userId"));
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const inboxQuery = queryParams.get("inbox");

  function formatTime(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);

    const diffInSeconds = Math.floor((now - time) / 1000);

    if (diffInSeconds < 10) {
      return "just now";
    } else if (diffInSeconds < 20) {
      return "20 sec ago";
    } else if (diffInSeconds < 30) {
      return "30 sec ago";
    } else if (diffInSeconds < 60) {
      return "1 min ago";
    } else if (diffInSeconds < 120) {
      return "2 mins ago";
    } else if (diffInSeconds < 180) {
      return "3 mins ago";
    } else if (diffInSeconds < 3600) {
      const minsAgo = Math.floor(diffInSeconds / 60);
      return `${minsAgo} mins ago`;
    } else if (diffInSeconds < 7200) {
      return "1 hour ago";
    } else if (diffInSeconds < 10800) {
      return "2 hours ago";
    } else if (diffInSeconds < 14400) {
      return "3 hours ago";
    } else if (time.getDate() === now.getDate() - 1) {
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const formattedTime = `${hours % 12 === 0 ? 12 : hours % 12}:${
        minutes < 10 ? "0" : ""
      }${minutes} ${hours >= 12 ? "PM" : "AM"}`;
      return `Yesterday ${formattedTime}`;
    } else if (time.getFullYear() === now.getFullYear()) {
      const options = { month: "short", day: "numeric" };
      return time.toLocaleDateString(undefined, options);
    } else {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return time.toLocaleDateString(undefined, options);
    }
  }

  function getFileTypeAndLink(url) {
    const parts = url.split("/");
    const filename = parts[parts.length - 1];
    const filenameParts = filename.split(".");

    if (filenameParts.length > 1) {
      const fileExtension = filenameParts.pop().toLowerCase();

      const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
      if (imageExtensions.includes(fileExtension)) {
        return url; // Return the original link if it's an image
      } else if (fileExtension === "pdf") {
        return "https://play-lh.googleusercontent.com/9XKD5S7rwQ6FiPXSyp9SzLXfIue88ntf9sJ9K250IuHTL7pmn2-ZB0sngAX4A2Bw4w";
      } else if (fileExtension === "docx") {
        return "https://play-lh.googleusercontent.com/gFABK_HVIVlHT1MhKw7q8YlQkdsJrdev7xtyHmbQHLiT9cjLUPSl4bTe0CsqMzI-69Y";
      } else if (fileExtension === "xlsx") {
        return "https://play-lh.googleusercontent.com/64kcVwFiko4_91zc2zkEQEw01_Ua1H2brLsinnsbNFeKyYLUprM3VJo5mYdcKtRLWCA";
      } else if (fileExtension === "csv") {
        return "https://thumbs.dreamstime.com/b/csv-file-icon-flat-design-document-download-css-button-vector-image-graphic-176040866.jpg";
      } else {
        return "https://static.vecteezy.com/system/resources/previews/006/692/271/original/document-icon-template-black-color-editable-document-icon-symbol-flat-illustration-for-graphic-and-web-design-free-vector.jpg"; // Return the provided link for non-image files
      }
    } else {
      return "https://static.vecteezy.com/system/resources/previews/006/692/271/original/document-icon-template-black-color-editable-document-icon-symbol-flat-illustration-for-graphic-and-web-design-free-vector.jpg"; // Return the provided link if there's no extension
    }
  }

  const ref = useRef();
  async function updateMessageSeen(outboxId, chatId) {
    const outboxChatUserRef = collection(db, "outbox", outboxId, "chatUser");

    try {
      const querySnapshot = await getDocs(outboxChatUserRef);

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.id === chatId) {
          const chatDocRef = doc.ref;
          updateDoc(chatDocRef, { msgSeen: true })
            .then(() => {
              console.log("Message updated to msgSeen: true");
            })
            .catch((error) => {
              console.error("Error updating message:", error);
            });
        }
      });
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  }

  const path = `/inbox/${message.form}/chatUser`;
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    updateMessageSeen(message.from, message.id);
  }, [message, path]);
  if (inboxQuery === "true") {
    return (
      <div
        ref={ref}
        className={`${styles.message} ${message.from === id && styles.owner}`}
      >
        {message?.Msg && (
          <div
            className={`${styles.msgContent} ${
              message.from === id && styles.msgContentOwner
            }`}
          >
            {" "}
            <pre>{message?.Msg}</pre>
            <img
              src={message.from === id ? blue : white}
              alt=""
              className={message.from === id ? styles.tail : styles.whiteTail}
            />
          </div>
        )}
        {message.document && (
          <div className={styles.imageDiv}>
            <img
              src={getFileTypeAndLink(message.document)}
              alt=""
              style={{ width: "300px", objectFit: "contain" }}
            />
            <Link to={message.document}>
              <BsDownload className={styles.downloadIcon} />
            </Link>
          </div>
        )}

        <span className={styles.timestamp}>
          {formatTime(message?.timestamp)}
        </span>
      </div>
    );
  }

  return (
    <>
      <div
        ref={ref}
        className={`${styles.message} ${message.from === id && styles.owner}`}
      >
        {message?.Msg && (
          <>
            {" "}
            <div
              className={`${styles.msgContent} ${
                message.from === id && styles.msgContentOwner
              }`}
            >
              {" "}
              <pre>{message?.Msg}</pre>
              <img
                src={message.from === id ? blue : white}
                alt=""
                className={message.from === id ? styles.tail : styles.whiteTail}
              />
            </div>
          </>
        )}

        {message.document && (
          <div className={styles.imageDiv}>
            <img
              src={getFileTypeAndLink(message.document)}
              alt=""
              style={{ width: "300px", objectFit: "contain" }}
            />
            <Link to={message.document}>
              <BsDownload className={styles.downloadIcon} />
            </Link>
          </div>
        )}
        <span className={styles.timestamp}>
          {formatTime(message?.timestamp)}
        </span>
      </div>
    </>
  );
};

export default Message;
