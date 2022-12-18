import { createContext, useState , useEffect } from "react";
import localforage from "localforage";
import { baseUrl } from "../Hooks/UseApi";
import axios from "axios";


export const starterPackMessagesPerChatContext = createContext();

export const StaStarterPackMessagesPerChatProvider = ({ children }) => {
  const [starterPackMessagesPerChat, setStarterPackMessagesPerChat] = useState(
    {}
  );

  useEffect(() => {
    const fetchData = async () => {
      const savedAuth = await localforage.getItem("auth");

      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: savedAuth.token,
        },
      };

      const data = await axios.get(`${baseUrl}/chats/starterpack/`, options);
      const messagesPerChat = data.data.data.messagesPerChat;

      setStarterPackMessagesPerChat(
        ...starterPackMessagesPerChat,
        messagesPerChat
      );
    };
    // fetchData();
  }, []);

  const value = {
    starterPackChats,
    setStarterPackChats,
  };

  return (
    <starterPackMessagesPerChatContext.Provider value={value}>
      {children}
    </starterPackMessagesPerChatContext.Provider>
  );
};
