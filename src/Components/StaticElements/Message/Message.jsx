import React from "react";
import styles from "./Message.module.css";

export const Message = ({ sender, datesent, content }) => {
  return (
    <div className={styles.Message}>
      <div className={styles.Left}>
        <img></img>
        <span>{sender}</span>
        <span> {content}</span>
      </div>
      <div  className={styles.right}>{datesent}</div>
    </div>
  );
};
