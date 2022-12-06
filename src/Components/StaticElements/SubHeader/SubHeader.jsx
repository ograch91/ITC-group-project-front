import styles from "./SubHeader.module.css"

export const SubHeader = ({text}) => {
  return (
    <h2 className={styles.SubHeader}>{text}</h2>
  )
}
