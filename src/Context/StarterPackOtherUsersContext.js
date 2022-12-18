import { createContext, useState , useEffect } from "react";
import localforage from "localforage";
import { baseUrl } from "../Hooks/UseApi";
import axios from "axios";

export const starterPackOtherUsersContext = createContext();

export const StarterPackOtherUsersProvider = ({ children }) => {
  const [starterPackOtherUsers, setStarterPackOtherUsers] = useState({});

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
      const otherUsers = data.data.data.otherUsers;

      setStarterPackOtherUsers(...starterPackOtherUsers, otherUsers);
    };
    // fetchData();
  }, []);

  const value = {
    starterPackOtherUsers,
    setStarterPackOtherUsers,
  };

  return (
    <starterPackOtherUsersContext.Provider value={value}>
      {children}
    </starterPackOtherUsersContext.Provider>
  );
};
