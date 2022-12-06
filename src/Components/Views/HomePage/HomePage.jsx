import { Header } from "../../StaticElements/Header/Header";
import { ContentWrapper } from "../../Layout/ContentWrapper/ContentWrapper";
import styles from "./HomePage.module.css";
import { Message } from "../../StaticElements/Message/Message";

export const HomePage = () => {

  return (
    <div className={styles.HomePage}>
    <Message id={"id"} chatid={"chatid"} sender={"Mosh"} datesent={"23.2.22"} content={"blah blah blah blah..."}/>
    <Message id={"id"} chatid={"chatid"} sender={"MoshJunior"} datesent={"23.2.22"} content={"Yada Yada Yada..."}/>
    </div>
  );
};
