import { Button } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { baseUrl } from '../../../Hooks/UseApi';
import { currentChatContext } from '../../../Context/CurrentChatContext';
import axios from 'axios';
import styles from './SubmitMessage.module.css';
import { UserAuthContext } from '../../../Context/UserAuthContext';
import { date } from 'yup/lib/locale';
import { AlertOnAppContext } from '../../../Context/AlertOnAppContext';
export const SubmitMessage = () => {
  const { showAppAlert } = useContext(AlertOnAppContext);
  const { currentChat } = useContext(currentChatContext);
  const [auth, setAuth] = useContext(UserAuthContext);

  const isDisable = useRef(false);

  useEffect(() => {
    if (currentChat) {
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
    chatid: currentChat,
    datesent: Date.now(),
    content: '',
  });
 
  const handleSubmit = async (e, message) => {
    e.preventDefault();
    // let date = new Date();
    // date = date.toLocaleString();
    const newMessage = { ...message, datesent: Date.now() };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth?.token || '',
      },
      body: JSON.stringify(newMessage),
    };
    try{
      const resp = await fetch(`${baseUrl}/messages/`, options);
      if (!resp.ok) {
        showAppAlert('Couldnt send message apologies', 'error');
        return;
      }
      setMessage({ ...message, datesent: '', content: '' });
    }catch(err){
      showAppAlert('Couldnt send message apologies', 'error');
      return;
    }
    
  };

  return (
    <div className={styles.SubmitMessage}>
      <textarea
        className={styles.form}
        placeholder="What you have in mind..."
        value={message.content}
        onChange={e =>
          setMessage(message => {
            return { ...message, content: e.target.value };
          })
        }
      />
      <Button
        onClick={e => handleSubmit(e, message)}
        disabled={
          isDisable.current ? true : message.content.length > 0 ? false : true
        }
      >
        Send Message
      </Button>
    </div>
  );
};
