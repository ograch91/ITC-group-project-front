import { useState } from "react";
import { Header } from "../../StaticElements/Header/Header";
import { ContentWrapper } from "../../Layout/ContentWrapper/ContentWrapper";
import { ChatWindow } from "../../Layout/ChatWindow/ChatWindow";
import { ChatList } from "../../Layout/ChatList/ChatList";
import styles from "./HomePage.module.css";


export const HomePage = () => {

  const [isAuth,setAuth]=useState(false);

  return (
    <div className={styles.HomePage}>
    {isAuth? 
      <div className={styles.ChatWrapper}>
        <ChatWindow/>
        <ChatList/>
      </div>
      :
      <>
    <Header title="Welcome Header"/>
    <ContentWrapper>
      <h3>register/Signup</h3>
    </ContentWrapper>
      </>
    }
    </div>
  );
};
