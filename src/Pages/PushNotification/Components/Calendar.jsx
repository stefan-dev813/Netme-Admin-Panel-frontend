import { Calendar, theme } from "antd";
import styles from "./styles.module.css";
import React from "react";

const Calendardiv = ({ setUpdatedDate, releaseDate }) => {
  const { token } = theme.useToken();
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: "18px",
  };

  const onPanelChange = (value, mode) => {
    const formattedDate = value.format("YYYY-MM-DD");
    if (formattedDate) {
      setUpdatedDate(formattedDate);
    }
  };

  return (
    <div style={wrapperStyle} className={styles.calender}>
      <Calendar fullscreen={false} onSelect={onPanelChange} />
    </div>
  );
};
export default Calendardiv;
