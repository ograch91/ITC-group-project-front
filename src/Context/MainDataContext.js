import { createContext, useState, useEffect, useContext } from 'react';
import { baseUrl } from '../Hooks/UseApi';
import { UserAuthContext } from './UserAuthContext';
import { AlertOnAppContext } from './AlertOnAppContext';
import { currentChatContext } from './CurrentChatContext';

export const MainDataContext = createContext();

export const MainDataProvider = ({ children }) => {
  const [auth, setAuth] = useContext(UserAuthContext);
  const { showAppAlert } = useContext(AlertOnAppContext);
  const { currentChat, setCurrentChat } = useContext(currentChatContext);

  const [chats, setChats] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);
  const [messagesPerChat, setMessagesPerChat] = useState([]);
  // const [groups , setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth?.token || '',
        },
      };

      const resp = await fetch(`${baseUrl}/chats/starterpack/`, options);
      if (!resp.ok) {
        showAppAlert(
          'Error Initialising data try refreshing the page',
          'error'
        );
        return;
      }
      const data = (await resp.json())?.data;
      setChats(data?.chats);
      setOtherUsers(data?.otherUsers);
      setMessagesPerChat(data?.messagesPerChat);
      if(data?.messagesPerChat && data?.messagesPerChat.length > 0){
        setCurrentChat(currentChat => {
          return {
            ...currentChat,
            chatid: data?.messagesPerChat[0].chatId,
            chatDisplaying: true,
          };
        });
  
      }
    };
    fetchData();
  }, []);

  const getMessagesForChat = chatId => {
    const result = messagesPerChat?.find(chat => chat.chatId === chatId)?.messages || [];
    //console.log('result', result, chatId);
    
    return result
  };

  const getOtherUserDetails = userId => {
    return otherUsers?.find(user => user.id === userId) || {};
  };

  // for groups?
  const getChatParticipants = chatId => {
    const chat = chats?.find(chat => chat.id === chatId);
    return chat?.participants || [];
  };

  const getOtherUserId = chatId => {
    const participants = getChatParticipants(chatId);
    const otherUserId = participants?.find(id => 
       id !== auth?.user.id );
    return otherUserId;
  };

  const state = {
    data: {
      chats,
      otherUsers,
      messagesPerChat,
    },
    getters: {
      getMessagesForChat,
      getOtherUserDetails,
      getOtherUserId,
      // getChatParticipants,
    },
    setters: {  // todo: create adding fncs
      setChats,
      setOtherUsers,
      setMessagesPerChat,
    },
  };

  return (
    <MainDataContext.Provider value={state}>
      {children}
    </MainDataContext.Provider>
  );
};
