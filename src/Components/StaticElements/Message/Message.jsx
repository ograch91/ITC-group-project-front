import React, { useContext } from "react";
import { UserAuthContext } from "../../../Context/UserAuthContext";
import styles from "./Message.module.css";

export const Message = ({ sender, datesent, content }) => {

  const [auth, setAuth] = useContext(UserAuthContext);
  const senderId = auth?.user?.id;

  const dateSent = new Date (parseInt(datesent)).toLocaleString();
  
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
      <div className={styles.right}>{dateSent}</div>
    </div>
  );
};
