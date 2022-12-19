import React, { useContext } from 'react';
import { MainDataContext } from '../../../Context/MainDataContext';
import { UserAuthContext } from '../../../Context/UserAuthContext';
import styles from './Message.module.css';
// import styles from "./ChatWindow.module.css";

export const Message = (messageObj) => {
  const { sender, datesent, content } = messageObj;
  const [auth, setAuth] = useContext(UserAuthContext);
  const mainData = useContext(MainDataContext);

  console.log('messageObj', messageObj);

  const senderId = auth?.user?.id;
  const otherUsers = mainData?.data?.otherUsers || [];
  const usersIncludingMe = [...otherUsers, auth.user];

  const dateSent = new Date(parseInt(datesent)).toLocaleString();

  const handleSubmit = () => {
    //console.log('activate user modal');
  };

  const userById = userId => usersIncludingMe.find(u => u.id === userId);
  const senderName = userById(messageObj.sender)?.name || 'Unknown';
  // const parsedDate = moment

  return (
    <div className={styles.Message}>
      <div className={styles.Left}>
        <span className={styles.user} onClick={() => handleSubmit()}>
          {senderName}
        </span>
        <span>{content}</span>
      </div>
      <div className={styles.right}>{dateSent}</div>
    </div>
  );
};
