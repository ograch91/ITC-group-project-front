import { useState } from "react";
import { Header } from "../../StaticElements/Header/Header";
import { ContentWrapper } from "../../Layout/ContentWrapper/ContentWrapper";
import { ChatWindow } from "../../Layout/ChatWindow/ChatWindow";
import { ChatList } from "../../Layout/ChatList/ChatList";
import styles from "./HomePage.module.css";
import { SubmitMessage } from "../../ActiveElements/SubmitMessage/SubmitMessage";


export const HomePage = () => {

  const [isAuth,setAuth]=useState(false);

  return (
    <div className={styles.HomePage}>
    {isAuth? 
      <div className={styles.ChatWrapper}>
      <div className={styles.ChatSection}>
        <ChatWindow/>
        <SubmitMessage/>
        </div>
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
