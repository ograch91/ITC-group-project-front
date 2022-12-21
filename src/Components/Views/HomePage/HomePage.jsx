import { ChatWindow } from '../../Layout/ChatWindow/ChatWindow';
import { ChatList } from '../../Layout/ChatList/ChatList';
import { SubmitMessage } from '../../ActiveElements/SubmitMessage/SubmitMessage';
import styles from './HomePage.module.css';
import { useContext, useEffect, useState } from 'react';
import { UserAuthContext } from '../../../Context/UserAuthContext';
import { AlertOnAppContext } from '../../../Context/AlertOnAppContext';
import { MainDataContext } from '../../../Context/MainDataContext';
import { Header } from '../../StaticElements/Header/Header';
import { currentPageContext } from '../../../Context/CurrentPageContext';

export const HomePage = () => {
  const { showAppAlert } = useContext(AlertOnAppContext);
  const { currentPage, setCurrentPage } = useContext(currentPageContext);
  const [auth, setAuth] = useContext(UserAuthContext);
  const mainData = useContext(MainDataContext);

  useEffect(() => {
    setCurrentPage(currentPage => {
      return { ...currentPage, Chat: true };
    });
    return () => {
      setCurrentPage(currentPage => {
        return { ...currentPage, Chat: false };
      });
    };
  }, []);

  const ws = useState();

  const connectToSocket = () => {
    if (!auth?.token) {
      console.log('No token');
      return;
    }
    // Setting the token in the cookie
    document.cookie = `token=${auth?.token}` || '';
    ws.current = new WebSocket(
      'wss://group-messaging-app.herokuapp.com',
      auth.token
    );
    // Opening the ws connection
    ws.current.onopen = () => {
      console.log('Connection opened');
      showAppAlert('Connected to messaging server', 'success');
    };
    // Listening on ws new added messages
    ws.current.onmessage = event => {
      try {
        const payload = JSON.parse(event.data);
        const { eventType, eventData } = payload;
        if (eventType === 'newMessage') {
          const newMessage = eventData;
          updateChatMessages(newMessage);
        } else if (eventType === 'newChat') {
          console.log('newChat', eventData);
          const newChat = eventData;
          getMissingUsers(newChat);
          updatedNewChat(newChat);
        } else {
          console.log('Unknown event type', payload);
        }
      } catch (error) {
        console.log('Error parsing event data', error);
      }

      // console.log("WSSSS", mainData.data?.messagesPerChat, data, )

      // setMessages((_messages) => [..._messages, data]);
    };
    ws.current.onclose = () => {
      console.log('Cleaning up...');
      showAppAlert(
        'Disconnected from server - Please refresh the page',
        'error',
        120000
      );
    };
    ws.current.onerror = error => {
      console.log(error);
      showAppAlert('Error occured - Please refresh the page', 'error', 120000);
    };
    // console.log('ws.current', ws);
  };

  const updateChatMessages = newMessage => {
    // const [messagesPerChat, setMessagesPerChat] = mainData.data?.messagesPerChat.current;
    // console.log(newMessage);
    const messagesPerChat = mainData.refs?.messagesPerChat_valRef?.current;
    const setMessagesPerChat = mainData.setters?.setMessagesPerChat;

    const current = messagesPerChat || [];
    // console.log(current);
    // console.log(current,newMessage, mainData.data?.messagesPerChat);
    const chatIndex = current.findIndex(
      chat => chat.chatId === newMessage?.chatid
    );
    const chatMessagesObj = current?.[chatIndex] || null;
    if (!chatMessagesObj) {
      console.warn('Chat not found, cannot add msg', newMessage);
      return;
    }

    const currentMessageListForChat = messagesPerChat[chatIndex].messages;
    // console.log(currentMessageListForChat);

    const messageAlreadyExists = currentMessageListForChat?.find(
      msg => msg.id === newMessage.id
    );
    if (messageAlreadyExists) {
      console.warn('Message already exists, skipping add msg', newMessage);
      return;
    }

    const udpatedMessageList = [...currentMessageListForChat, newMessage];
    udpatedMessageList.sort((a, b) => a.id - b.id);
    // console.log(udpatedMessageList);

    messagesPerChat[chatIndex].messages = udpatedMessageList;

    const updated = [...messagesPerChat];
    // console.log(current,updated);
    setMessagesPerChat(updated);
    mainData.refs.messagesPerChat_valRef.current = updated;
  };

  const updatedNewChat = newChat => {
    const chats = mainData.refs?.chats_valRef?.current;
    const setChats = mainData.setters?.setChats;
    const current = chats || [];

    const chatIndex = current.findIndex(chat => chat.id === newChat?.id);

    if (chatIndex == -1) {
      const updated = [...chats, newChat];
      setChats(updated);
      mainData.refs.chats_valRef.current = updated;
    } else {
      console.log('Chat already exists');
    }

    const messagesPerChat = mainData.refs?.messagesPerChat_valRef?.current;
    const setMessagesPerChat = mainData.setters?.setMessagesPerChat;

    const chatObjIndex = messagesPerChat.findIndex(
      chat => chat.chatId === newChat?.id
    );

    if (chatObjIndex == -1) {
      const newChatObj = { chatId: newChat.id, messages: [] };
      const updated = [...messagesPerChat, newChatObj];
      setMessagesPerChat(updated);
      mainData.refs.messagesPerChat_valRef.current = updated;
    } else {
      console.log('MessagesPerChat already exists');
    }
  };

  const getMissingUsers = async newChat => {
    const users = mainData.refs?.users_valRef?.current;
    const setOtherUsers = mainData.setters?.setOtherUsers;

    const current = users || [];
    const otherUsers =
      newChat?.participants?.filter(userId => userId !== auth.user?.id) || [];

    const missingUserIds =
      otherUsers?.filter(userId => !current.includes(userId)) || [];

    const fetchedUsers = [];
    for (const userId of missingUserIds) {
      const user = await getUserDetailsFromServer(userId);
      if (user) fetchedUsers.push(user);
    }
    console.log(fetchedUsers);
    const updated = [...current, ...fetchedUsers];
    setOtherUsers(updated);
    mainData.refs.users_valRef.current = updated;
  };

  const getUserDetailsFromServer = async userId => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth?.token || '',
      },
    };
    try {
      console.log(userId);
      const resp = await fetch(
        `https://group-messaging-app.herokuapp.com/users/${userId}`,
        options
      );
      if (!resp.ok) {
        showAppAlert('Couldnt get participant detail', 'warning');
        return;
      }
      const payload = await resp.json();
      return payload.data;
    } catch (err) {
      showAppAlert('Couldnt get participant detail', 'warning');
      return;
    }
  };

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
      <Header title={`Hey ${auth.user.name}`} />
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
