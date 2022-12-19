import { ChatWindow } from '../../Layout/ChatWindow/ChatWindow';
import { ChatList } from '../../Layout/ChatList/ChatList';
import { SubmitMessage } from '../../ActiveElements/SubmitMessage/SubmitMessage';
import styles from './HomePage.module.css';
import { CurrentChatProvider } from '../../../Context/CurrentChatContext';
import { useContext, useEffect, useRef } from 'react';
import { UserAuthContext } from '../../../Context/UserAuthContext';
import { AlertOnAppContext } from '../../../Context/AlertOnAppContext';
import {
  MainDataContext,
  MainDataProvider,
} from '../../../Context/MainDataContext';

export const HomePage = () => {
  const { showAppAlert } = useContext(AlertOnAppContext);
  const [auth, setAuth] = useContext(UserAuthContext);
  const mainData = useContext(MainDataContext);

  const ws = useRef();

  const connectToSocket = () => {
    if (!auth?.token) {
      console.log('No token');
      return;
    }
    // Setting the token in the cookie
    document.cookie = `token=${auth?.token}` || '';
    ws.current = new WebSocket('ws://localhost:4000');
    // Opening the ws connection
    ws.current.onopen = () => {
      console.log('Connection opened');
      showAppAlert('Connected to messaging server', 'success');
      // setConnectionOpen(true);
    };
    // Listening on ws new added messages
    ws.current.onmessage = event => {
      console.log(event.data, auth);
      const data = JSON.parse(event.data);
      console.log("WSSSS", mainData.data?.messagesPerChat, data)
      updateChatMessages(data);
      // setMessages((_messages) => [..._messages, data]);
    };
    ws.current.onclose = () => {
      showAppAlert('Disconnected from messaging server', 'info');
      console.log('Connection closed');
      // setConnectionOpen(false);
    };
  };

  const updateChatMessages = (newMessage) => {
    const current = mainData.data?.messagesPerChat || [];
    console.log(current,newMessage, mainData.data?.messagesPerChat);
    const chatIndex = current.findIndex(chat => chat.chatId === newMessage?.chatid);
    const chatMessagesObj = current?.[chatIndex] || null;
    if (!chatMessagesObj) {
      console.warn('chat not found, cannot add msg', newMessage);
      return;
    }
    const updated = [...current]
    updated.messages?.push(newMessage);
    updated[chatIndex] = chatMessagesObj; // update the array
    updated.messages?.sort((a, b) => a.id - b.id);
    mainData.setters?.setMessagesPerChat(updated);
  }

  const disconnectFromSocket = () => {
    console.log('Cleaning up...');
    ws.current.close();
  };

  useEffect(() => {
    connectToSocket();
    return disconnectFromSocket;
  }, []);

  return (
    <div className={styles.HomePage}>
      <div className={styles.ChatWrapper}>
        <div className={styles.ChatSection}>
          <ChatWindow />
          <SubmitMessage />
        </div>
        <ChatList />
      </div>
    </div>
  );
};
