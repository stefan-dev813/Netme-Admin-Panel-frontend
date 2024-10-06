import React from "react";
import Message from "./Message";
import styles from "./style.module.css";
const Messages = ({ messages }) => {
  return (
    <div className={styles.messages}>
      {messages.map((m, i) => (
        <Message message={m} key={i} />
      ))}
    </div>
  );
};

export default Messages;
