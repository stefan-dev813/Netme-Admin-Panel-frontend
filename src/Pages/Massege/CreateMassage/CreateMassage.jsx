import React, { useEffect, useState } from 'react'
import styles from "./style.module.css"
import attach from "../../../assets/attach.svg"
import { ImTelegram } from 'react-icons/im';
import { RxCross1 } from 'react-icons/rx';
import { RxCrossCircled } from "react-icons/rx";
import {
  addDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from '../../../Firebase_config';
import { fileRequest, userRequest } from '../../../requestMethod';
import Messages from '../Chat/Components/Messages';
import { Button, Input, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import docx from "../../../assets/usersDashboard/docx.svg"
import pdf from "../../../assets/usersDashboard/pdf.svg"
import documentImg from "../../../assets/usersDashboard/document.svg"
import xl from "../../../assets/usersDashboard/xl.svg"
import csv from "../../../assets/usersDashboard/csv.svg";
import { AutoComplete } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

const CreateMassage = () => {
  // const [decodedToken] = useContext(UserContext)
  // console.log('decodedToken:', decodedToken)
  const senderName = JSON.parse(localStorage.getItem("userName"));


  const [count, setCount] = useState(true)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search);
  const chatId = queryParams.get('chatId');
  const navigate = useNavigate()
  const [autocomplete,setAutocomplete] =useState("#fff") 
  const [document, setDocument] = useState("")
  const [selected, setSelected] = useState("")
  const [inbox, setInbox] = useState([])
  const [msg, setMsg] = React.useState("");
  const [subject, setSubject] = useState("")
  const [partners, setPartners] = useState([])
  const [receiver, setReceiver] = useState({});
    const [options, setOptions] = useState([]);
  const [value, setValue] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [isTextPresent, setIsTextPresent] = useState(false);
  const [showClearButton, setShowClearButton] = useState(false);

  const handleSearch = (searchValue) => {
    setSearchText(searchValue);
    setValue(searchValue);
    setIsTextPresent(searchValue !== '');
    setShowClearButton(searchValue !== '');
  };
console.log(selected, 'partners')
  const handleClear = () => {
    setSearchText('');
    setAutocomplete("#fff")
    setValue('');
    setIsTextPresent(false);
    setShowClearButton(false);
  };

  const id = JSON.parse(localStorage.getItem("userId"))

  useEffect(() => {
    userRequest(`/admin/partner/getAllPartners?status=Active`).then((res) => {
      setPartners(res.data.data)
    })

  }, []);

  useEffect(() => {
    setFilteredPartners(
      partners.filter(
        (partner) =>
          partner?.partnerId?.fullName
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          partner?.partnerId?.lastName
            .toLowerCase()
            .includes(searchText.toLowerCase())
      )
    );
  }, [searchText, partners]);


  const setPartner = (id) => {
    const selectedPartner = partners.find((el) => el.partnerId._id === id);
    setReceiver(selectedPartner)
  }
  const fetchMessagesInbox = async () => {
    try {

      const userInfoCollectionRef = collection(
        db,
        "Chats",
        id,
        "chatUser",
        selected,
        chatId
      )
      const unsubscribe = onSnapshot(userInfoCollectionRef, (snapshot) => {
        // deleteNewChatBetween(router.query._id, props.user._id);
        const messages = [];
        snapshot.forEach((doc) => {
          messages.push(doc.data());
        });

        const sortedMessages = messages.sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );

        setInbox(sortedMessages);

      });

      // Return the unsubscribe function to detach the listener when needed
      return unsubscribe;

    } catch (error) {
      console.error("Error fetching messages: ", error);
    }
  };



  const sendMessage = async () => {
    try {
      setDocument("")
      setMsg("")
      await addDoc(
        collection(
          db,
          `Chats/${id}/chatUser/${receiver?.partnerId?._id}/${chatId}`
        ),
        {
          Msg: msg,
          sender_name: senderName,
          receiver_name: receiver?.partnerId?.fullName + " " + receiver?.partnerId?.lastName,
          location: receiver?.city,
          document: document ? document : false,
          subject,
          from: id,
          to: receiver?.partnerId?._id,
          msgSeen: false,
          partnerName: selected,
          timestamp: new Date().toISOString(),
        }
      );


      if (count) {
        await addDoc(
          collection(
            db,
            `outbox/${id}/chatUser`
          ),
          {
            id: chatId,
            sender_name: senderName,
            receiver_name: receiver?.partnerId?.fullName + " " + receiver?.partnerId?.lastName,
            to: receiver?.partnerId?._id,
            location: receiver?.city,
            Msg: msg,
            document: document ? document : false,
            subject,
            from: id,
            sender: true,
            receiver: false,
            partnerName:selected,
            timestamp: new Date().toISOString(),
          }
        );

        await addDoc(
          collection(
            db,
            `inbox/${receiver?.partnerId?._id}/chatUser`
          ),
          {
            id: chatId,
            to: receiver?.partnerId?._id,
            sender_name: senderName,
            location: receiver?.city,
            receiver_name: receiver?.partnerId?.fullName + " " + receiver?.partnerId?.lastName,
            Msg: msg,
            document: document ? document : false,
            subject,
            from: id,
            sender: true,
            receiver: false,
            partnerName: selected,
            timestamp: new Date().toISOString(),
          }
        );
        setCount(false)

      }
      navigate("/Messages")



    } catch (error) {
      console.error("Error adding new document: ", error);
    }
  };
  useEffect(() => {
    userRequest(`/admin/partner/getAllPartners?status=Active`).then((res) => {
      setPartners(res.data.data)
    })
    if (selected) {
      fetchMessagesInbox()
    }

  }, [selected])


  const upload = async (e) => {
    const formData = new FormData();
    const image = e.target.files[0]; // Get the first selected file from the array

    if (image) {
      // Check if the file size is within the limit (25MB)
      const fileSizeInMB = image.size / (1024 * 1024); // Convert bytes to MB
      if (fileSizeInMB > 25) {
        message.error("File size exceeds the 25MB limit");
        return; // Abort the upload if the file size is too large
      }

      formData.append('file', image);

      // Append the selected file to the FormData

      fileRequest.post('/api/util/uploadFile', formData)
        .then((res) => {
          console.log('res:', res.data.url);
          setDocument(res.data.url);
          message.success("File uploaded successfully");
        })
        .catch((err) => {
          console.log(err);
          message.error("File upload failed");
        });
    }
  };

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

  return (
    <div className={styles.MainContainer}>
      <div className={styles.topDiv}>
        <h1>
          MESSAGES
        </h1>
        <span>
          Messages {'>'} <b style={{ color: 'gray' }}>{selected ? selected : "New Messages"}</b>
        </span>
        <div className={styles.selectDiv}>
          <div>
            <b>
            Send to:
          </b>
          <AutoComplete
            style={{ width: 100, bottom:'2.5px',left:'10px',background:autocomplete, borderRadius:'20px'}}
            options={filteredPartners.map((partner) => ({
              label: `${partner?.name} `,
              value: partner.name,
            }))}
            onSelect={(selectedValue, option) => {
              setAutocomplete("#c5c8cd")
          const selectedPartner = filteredPartners.find(
            (partner) => partner.name === selectedValue
          );
          setSelected(selectedPartner.name);
          setReceiver(selectedPartner);
          setSearchText('');
          setValue(option.label);
            }}
            onSearch={handleSearch}
        onBlur={() => setIsTextPresent(false)}
        placeholder="Search for a partner"
        value={value}
        bordered={false}
          >
          </AutoComplete>
          </div>
          
          {showClearButton && (
            <RxCrossCircled
              onClick={handleClear}
              style={{
                display: 'flex',
                color: 'red',
                marginTop: '5px'
              }}
            />
        )}
        </div>
        <div className={styles.subjectDiv}>
          <p>
            Subject
          </p>
          <input type="text" placeholder='Enter the subject...' onChange={(e) => setSubject(e.target.value)} value={subject} />
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
        <textarea type="text" name="" id="" rows={3} onChange={(e) => setMsg(e.target.value)} value={msg} />
        <div>
          <label htmlFor="main">
            <img src={attach} alt="" />

          </label>
          <input type="file" id='main' onChange={(e) => upload(e)} style={{ display: "none" }} />

          <ImTelegram fontSize={35} onClick={() => sendMessage()} />

        </div>

      </div>
    </div >
  )
}

export default CreateMassage