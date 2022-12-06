import React from "react";
import styles from "./Message.module.css";

export const Message = ({ sender, dateSent, content }) => {

  const handleSubmit =()=>{
    console.log("activate user modal");
  }

  return (
    <div className={styles.Message}>
      <div className={styles.Left}>
        <img></img>
        <span className={styles.user} onClick={()=>handleSubmit()}>{sender}</span>
        <span> {content}</span>
      </div>
      <div  className={styles.right}>{dateSent}</div>
    </div>
  );
};
