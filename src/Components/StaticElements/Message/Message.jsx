import React from "react";
import styles from "./Message.module.css";

export const Message = ({ sender, datesent, content }) => {
  const handleSubmit = () => {
    console.log("activate user modal");
  };

  return (
    <div className={styles.Message}>
      <div className={styles.Left}>
        <span className={styles.user} onClick={() => handleSubmit()}>
          {sender}
        </span>
        <span>{content}</span>
      </div>
      <div className={styles.right}>{datesent}</div>
    </div>
  );
};
