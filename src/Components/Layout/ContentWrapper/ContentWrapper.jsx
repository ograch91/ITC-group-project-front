import styles from './ContentWrapper.module.css'

export const ContentWrapper = ({children}) => {
  return (
    <h2 className={styles.ContentWrapper}>{children}</h2>
  )
}
