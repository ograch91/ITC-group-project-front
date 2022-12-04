import { Header } from "../../StaticElements/Header/Header";
import { ContentWrapper } from "../../Layout/ContentWrapper/ContentWrapper";
import styles from "./HomePage.module.css";

export const HomePage = () => {

  return (
    <div className={styles.HomePage}>
    <Header title="Welcome Header"/>
    <ContentWrapper></ContentWrapper>
    </div>
  );
};
