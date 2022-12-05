import { Header } from "../../StaticElements/Header/Header";
import { ContentWrapper } from "../../Layout/ContentWrapper/ContentWrapper";
import styles from "./HomePage.module.css";
import { ChatWindow } from "../../Layout/ChatWindow/ChatWindow";

export const HomePage = () => {

  return (
    <div className={styles.HomePage}>
    <ChatWindow/>
    </div>
  );
};
