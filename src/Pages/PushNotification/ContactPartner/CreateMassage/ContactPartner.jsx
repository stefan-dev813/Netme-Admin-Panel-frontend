import React, { useState } from 'react'
import styles from "./style.module.css"
import attach from "../../../../assets/attach.svg"
import { ImTelegram } from 'react-icons/im';
const ContactPartner = () => {
  const [selected, setSelected] = useState("")
  return (
    <div className={styles.MainContainer}>
      <div className={styles.topDiv}>
    
        <span>
        Previous Notifications {'>'} <b>Contact Partner</b>
        </span>
        <div className={styles.selectDiv}>
         <p>George Davis</p>
        </div>
        <div className={styles.subjectDiv}>
          <p>
            Subject
          </p>
          <input type="text" placeholder='Enter the subject...' />
        </div>

      </div>
      <div className={styles.chatDiv}>

      </div>
      <div className={styles.sendMsgDiv}>
        <textarea type="text" name="" id="" rows={3} />
        <div>
          <img src={attach} alt=""  />

          <ImTelegram fontSize={35} />

        </div>

      </div>
    </div>
  )
}

export default ContactPartner