import { Header } from "../../StaticElements/Header/Header";
import { ContentWrapper } from "../../Layout/ContentWrapper/ContentWrapper";
import { Message } from "../../StaticElements/Message/Message";
import styles from "./HomePage.module.css";


export const HomePage = () => {

  return (
    <div className={styles.HomePage}>
    <ChatWindow/>
    </div>
  );
};
