import { createContext, useState } from 'react';
export const currentChatContext = createContext();
export const CurrentChatProvider = ({ children }) => {
  
  const [currentChat, setCurrentChat] = useState("");

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
