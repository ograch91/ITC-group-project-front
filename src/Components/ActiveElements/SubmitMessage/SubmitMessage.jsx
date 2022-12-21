import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { baseUrl } from '../../../Hooks/UseApi';
import { currentChatContext } from '../../../Context/CurrentChatContext';
import styles from './SubmitMessage.module.css';
import { UserAuthContext } from '../../../Context/UserAuthContext';
import { AlertOnAppContext } from '../../../Context/AlertOnAppContext';
import { MainDataContext } from '../../../Context/MainDataContext';

export const SubmitMessage = () => {
  const { showAppAlert } = useContext(AlertOnAppContext);
  const { currentChat } = useContext(currentChatContext);
  const [auth, setAuth] = useContext(UserAuthContext);
  const mainData = useContext(MainDataContext);

  const isDisable = useRef(false);

  useEffect(() => {
    if (currentChat.chatDisplaying) {
      isDisable.current = false;
    } else {
      isDisable.current = true;
    }
    return () => {
      isDisable.current = true;
    };
  }, [currentChat]);

  const [message, setMessage] = useState({
    sender: auth?.user?.id,
    chatid: currentChat.chatid,
    datesent: Date.now(),
    content: '',
  });

  const handleSubmit = async (e, message) => {
    e.preventDefault();
    await sendToServer(message);
  };

  const sendToServer = async message => {
    const newMessage = {
      ...message,
      chatid: currentChat.chatid,
      datesent: Date.now(),
    };
    console.log(newMessage, mainData.data?.messagesPerChat);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth?.token || '',
      },
      body: JSON.stringify(newMessage),
    };
    try {
      const resp = await fetch(`${baseUrl}/messages/`, options);
      if (!resp.ok) {
        showAppAlert('Couldnt send message apologies', 'error');
        return;
      }
      setMessage({ ...message, datesent: '', content: '' });
    } catch (err) {
      showAppAlert('Couldnt send message apologies', 'error');
      return;
    }
  };
  const onEnterPress = e => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      handleSubmit(e, message);
    }
  };
  return (
    <div className={styles.SubmitMessage}>
      <div className={styles.textArea}>
        <textarea
          className={styles.form}
          placeholder="What you have in mind..."
          value={message.content}
          onChange={e =>
            setMessage(message => {
              return { ...message, content: e.target.value };
            })
          }
          onKeyDown={onEnterPress}
        />
        <Button
          onClick={e => handleSubmit(e, message)}
          disabled={
            isDisable.current ? true : message.content.length > 0 ? false : true
          }
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </div>
    </div>
  );
};
