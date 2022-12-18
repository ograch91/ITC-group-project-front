import { createContext, useState } from "react";

export const currentChatContext = createContext();

export const CurrentChatProvider = ({ children }) => {
  const hardchat = 'dfa29b17-4079-4fbb-a050-428bb2af5c12'
  const [currentChat, setCurrentChat] = useState(hardchat);
  
  const value = {
    currentChat,
    setCurrentChat,
  };

  return (
    <currentChatContext.Provider value={value}>
      {children}
    </currentChatContext.Provider>
  );
};
