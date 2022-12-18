import { createContext, useState , useEffect } from "react";
import localforage from "localforage";
import { baseUrl } from "../Hooks/UseApi";
import axios from "axios";

export const starterPackChatsContext = createContext();

export const StarterPackChatsProvider = ({ children }) => {
  const [starterPackChats, setStarterPackChats] = useState(null);

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
      const chats = data.data.data.chats;
      setStarterPackChats((starterPackChats)=>{return {...starterPackChats,chats}});
    };
    // fetchData();
  }, []);

  const value = {
    starterPackChats,
    setStarterPackChats,
  };

  return (
    <starterPackChatsContext.Provider value={value}>
      {children}
    </starterPackChatsContext.Provider>
  );
};
