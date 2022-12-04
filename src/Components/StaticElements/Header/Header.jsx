import React from "react";
import styles from "./Header.module.css";

export const Header = ({ title }) => {
  
  return (
  
    <div className={styles.Header}>
      <span>{title}</span>
    </div>
  );
};
