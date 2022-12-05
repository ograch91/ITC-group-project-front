import { useState } from "react";
import { Header } from "../../StaticElements/Header/Header";
import { ContentWrapper } from "../../Layout/ContentWrapper/ContentWrapper";
import { ChatWindow } from "../../Layout/ChatWindow/ChatWindow";
import styles from "./HomePage.module.css";

export const HomePage = () => {

  const [isAuth,setAuth]=useState(false);

  return (
    <div className={styles.HomePage}>
    {isAuth?  <>  
    {/* searchBar */}
    {/* userList */}
     <ChatWindow/>
    </>: <>
    <Header title="Welcome Header"/>
    <ContentWrapper>
      <h3>register</h3>
      <h3>login</h3>
    </ContentWrapper>
    </>
    }
    </div>
  );
};
