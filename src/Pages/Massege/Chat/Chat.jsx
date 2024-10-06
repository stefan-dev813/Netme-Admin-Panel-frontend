import React, { useEffect, useState } from 'react'
import styles from "./style.module.css"
import attach from "../../../assets/attach.svg"
import { ImTelegram } from 'react-icons/im';
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from '../../../Firebase_config';
import docx from "../../../assets/usersDashboard/docx.svg"
import pdf from "../../../assets/usersDashboard/pdf.svg"
import documentImg from "../../../assets/usersDashboard/document.svg"
import xl from "../../../assets/usersDashboard/xl.svg"
import csv from "../../../assets/usersDashboard/csv.svg"
import { fileRequest } from '../../../requestMethod';
import { useLocation, useParams } from 'react-router-dom';
import Messages from './Components/Messages';
import { RxCross1 } from 'react-icons/rx';
import { message } from 'antd';
const Chat = () => {
  const params = useParams()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const inboxQuery = queryParams.get('inbox');
  const chatId = queryParams.get('chatId');
  // console.log('inboxQuery:', inboxQuery)

  const [msg, setMsg] = React.useState("");
  const [document, setDocument] = useState("")

  const [subject, setSubject] = useState("")
  const [inbox, setInbox] = useState([])
  const id = JSON.parse(localStorage.getItem("userId"))
  const fetchMessagesInbox = async () => {
    try {

      const userInfoCollectionRef = inboxQuery === "true" ? collection(
        db,
        "Chats",
        params.id,
        "chatUser",
        id,
        chatId
      ) : collection(
        db,
        "Chats",
        id,
        "chatUser",
        params.id,
        chatId
      )
      const unsubscribe = onSnapshot(userInfoCollectionRef, (snapshot) => {
        const messages = [];
        snapshot.forEach((doc) => {
          messages.push(doc.data());
        });
        updateOnSnapshotMessageSeen(id, chatId)

        const sortedMessages = messages.sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        setInbox(sortedMessages);
      });
      return unsubscribe;

    } catch (error) {
      console.error("Error fetching messages: ", error);
    }
  };



  useEffect(() => {
    fetchMessagesInbox()
  }, [])

  async function updateSendMessageSeen(outboxId, chatId) {
    const path = inboxQuery !== "true" ? 'inbox' : 'outbox'
    const value = inboxQuery === "true" ? {
      sender: false,
    } : {
      receiver: false,
    }
    const outboxChatUserRef = collection(db, path, outboxId, 'chatUser');

    try {
      const querySnapshot = await getDocs(outboxChatUserRef);

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.id === chatId) {
          const chatDocRef = doc.ref;

          updateDoc(chatDocRef, value)
            .then(() => {
              console.log('Message updated to msgSeen: true');
            })
            .catch((error) => {
              console.error('Error updating message:', error);
            });
        }
      });
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  }
  async function updateOnSnapshotMessageSeen(outboxId, chatId) {
    const path = inboxQuery === "true" ? 'inbox' : 'outbox'
    const value = inboxQuery !== "true" ? {
      sender: true,
    } : {
      receiver: true,
    }
    const outboxChatUserRef = collection(db, path, outboxId, 'chatUser');

    try {
      const querySnapshot = await getDocs(outboxChatUserRef);

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.id === chatId) {
          const chatDocRef = doc.ref;

          updateDoc(chatDocRef, value)
            .then(() => {
              console.log('Message updated to msgSeen: true');
            })
            .catch((error) => {
              console.error('Error updating message:', error);
            });
        }
      });
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  }

  function getFileTypeAndLink(url) {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    const filenameParts = filename.split('.');

    if (filenameParts.length > 1) {
      const fileExtension = filenameParts.pop().toLowerCase();

      const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
      if (imageExtensions.includes(fileExtension)) {
        return url; // Return the original link if it's an image
      } else if (fileExtension === "pdf") {
        return pdf
      }
      else if (fileExtension === "docx") {
        return docx
      }
      else if (fileExtension === "xlsx") {
        return xl
      }
      else if (fileExtension === "csv") {
        return csv
      }
      else {
        return documentImg
      }
    } else {
      return documentImg
    }
  }
  const sendMessage = async (receiverId, img) => {
    try {

      if (inboxQuery !== "true") {
        if (msg || document) {
          await addDoc(
            collection(
              db,
              `Chats/${id}/chatUser/${params.id}/${chatId}`
            ),
            {
              id: chatId,
              Msg: msg,
              document: document ? document : false,
              subject,
              from: id,
              to: params.id,
              msgSeen: false,
              timestamp: new Date().toISOString(),
            }
          );
          setMsg("")
          setDocument("")

        }

      }
      else {
        if (msg || document) {
          await addDoc(
            collection(
              db,
              `Chats/${params.id}/chatUser/${id}/${chatId}`
            ),
            {
              id: chatId,
              Msg: msg,
              document: document ? document : false,
              subject,
              from: id,
              to: params.id,
              msgSeen: false,
              timestamp: new Date().toISOString(),
            }
          );
          setMsg("")
          setDocument("")


        }
      }
      updateSendMessageSeen(params.id, chatId)

    } catch (error) {
      console.error("Error adding new document: ", error);
    }

  };

  const upload = async (e) => {
    const formData = new FormData();
    const image = e.target.files[0]; // Get the first selected file from the array

    if (image) {

      formData.append('file', image);
      fileRequest.post('/api/util/uploadFile', formData)
        .then((res) => {
          setDocument(res.data.url);
          message.success("File uploaded successfully");
        })
        .catch((err) => {
          console.log(err);
          message.error("File upload failed");
        });
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      setMsg(msg + '\n');
    } else if (e.key === 'Enter') {
      e.preventDefault();
      // Call your function here when Enter is pressed without Shift
      sendMessage();
    }
  };



  return (
    <div className={styles.MainContainer}>
      <div className={styles.topDiv}>
        <h1>
          MESSAGES
        </h1>
        <span>
          Messages {'>'} <b>{inboxQuery === "true" ? inbox[0]?.sender_name : inbox[0]?.receiver_name}</b>
        </span>
        <div className={styles.selectDiv}>
          <b>
            Sent To:&nbsp;{inboxQuery === "true" ? inbox[0]?.sender_name : inbox[0]?.receiver_name}
          </b>

        </div>
        <div className={styles.subjectDiv}>
          <p>
            Subject
          </p>
          <input type="text" placeholder='Enter the subject...'
            // onChange={(e) => setSubject(e.target.value)}
            value={inbox[0]?.subject} />
        </div>

      </div>
      <div className={styles.chatDiv}>
        <Messages messages={inbox} />
      </div>
      <div className={styles.sendMsgDiv}>
        {
          document &&
          <span className={styles.previewDiv}>
            <RxCross1 className={styles.prevCross} onClick={() => setDocument("")} />

            <img src={getFileTypeAndLink(document)} alt="" />
          </span>
        }
        <textarea type="text" name="" id="" rows={3} onChange={(e) => setMsg(e.target.value)} value={msg} onKeyDown={handleKeyDown} />
        <div>
          <label htmlFor="main">
            <img src={attach} alt="" />

          </label>
          <input type="file" id='main' onChange={(e) => upload(e)} style={{ display: "none" }} />

          <ImTelegram fontSize={35} onClick={() => sendMessage()} />

        </div>

      </div>


    </div>
  )
}

export default Chat