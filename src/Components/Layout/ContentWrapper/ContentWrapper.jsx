import styles from './ContentWrapper.module.css'

export const ContentWrapper = ({children}) => {
  return (
    <div className={styles.ContentWrapper}>{children}</div>
  )
}
