import styles from "./SubHeader.module.css"

export const SubHeader = ({children}) => {
  return (
    <h2 className={styles.SubHeader}>{children}</h2>
  )
}
