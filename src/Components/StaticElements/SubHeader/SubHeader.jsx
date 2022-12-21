import styles from './SubHeader.module.css';

export const SubHeader = ({ text, children, func }) => {
  return (
    <div className={styles.SubHeader}>
      <h2>
        {text}
        <div className={styles.clickable} onClick={func}>
          {children}
        </div>
      </h2>
    </div>
  );
};
