import { createContext, useState } from 'react';

export const currentPageContext = createContext();

export const CurrentPageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState({
    Chat: false,
    Profile: false,
  });

  const value = {
    currentPage,
    setCurrentPage,
  };

  return (
    <currentPageContext.Provider value={value}>
      {children}
    </currentPageContext.Provider>
  );
};
