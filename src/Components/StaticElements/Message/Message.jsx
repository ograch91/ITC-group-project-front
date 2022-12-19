import moment from 'moment/moment';
import React, { useContext } from 'react';
import { MainDataContext } from '../../../Context/MainDataContext';
import { UserAuthContext } from '../../../Context/UserAuthContext';
import styles from './Message.module.css';

export const Message = messageObj => {
  const { sender, datesent, content } = messageObj;
  const [auth, setAuth] = useContext(UserAuthContext);
  const mainData = useContext(MainDataContext);

  const otherUsers = mainData?.data?.otherUsers || [];
  const usersIncludingMe = [...otherUsers, auth.user];

  const userById = userId => usersIncludingMe.find(u => u.id === userId);
  const senderName = userById(messageObj.sender)?.name || 'Unknown';

  const parsedDate = moment(parseInt(datesent)).calendar();

  return (
    <div className={styles.Message}>
      <div className={styles.Left}>
        <span className={styles.user}>{senderName}</span>
        <span>{content}</span>
      </div>
      <div className={styles.right}>{parsedDate}</div>
    </div>
  );
};
