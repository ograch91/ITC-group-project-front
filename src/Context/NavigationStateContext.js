import { createContext, useState } from "react";

export const NavigationStateContext = createContext();

export const NavigationStateProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(true);

  const value = {
    isAuth,
    setIsAuth,
  };

  return (
    <NavigationStateContext.Provider value={value}>
      {children}
    </NavigationStateContext.Provider>
  );
};
