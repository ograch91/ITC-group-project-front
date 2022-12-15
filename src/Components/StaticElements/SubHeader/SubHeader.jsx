import styles from "./SubHeader.module.css";

export const SubHeader = ({ children , func}) => {
  return <h2 className={styles.SubHeader}>
  <div className={styles.clickable} onClick={func}>
  {children}
  </div>
  </h2>;
};
