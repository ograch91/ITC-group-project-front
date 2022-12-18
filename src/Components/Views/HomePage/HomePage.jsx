import { ChatWindow } from '../../Layout/ChatWindow/ChatWindow';
import { ChatList } from '../../Layout/ChatList/ChatList';
import { SubmitMessage } from '../../ActiveElements/SubmitMessage/SubmitMessage';
import styles from './HomePage.module.css';
import { CurrentChatProvider } from '../../../Context/CurrentChatContext';
import { useContext, useEffect, useRef } from 'react';
import { UserAuthContext } from '../../../Context/UserAuthContext';

export const HomePage = () => {
  const [auth, setAuth] = useContext(UserAuthContext);
  // console.log(document.cookie);
  const ws = useRef();
  const wsUrl = 'ws://localhost:8080';

  useEffect(() => {
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
      // setConnectionOpen(true);
    };
    // Listening on ws new added messages
    ws.current.onmessage = event => {
      const data = JSON.parse(event.data);
      console.log(data);
      // setMessages((_messages) => [..._messages, data]);
    };

    return () => {
      console.log('Cleaning up...');
      ws.current.close();
    };
  }, []);

  return (
    <div className={styles.HomePage}>
      <CurrentChatProvider>
        <div className={styles.ChatWrapper}>
          <div className={styles.ChatSection}>
            <ChatWindow />
            <SubmitMessage />
          </div>
          <ChatList />
        </div>
      </CurrentChatProvider>
    </div>
  );
};
