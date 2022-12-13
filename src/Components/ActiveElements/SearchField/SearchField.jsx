import { TextField } from "@mui/material"
import styles from "../SearchField/SearchField.module.css"

export const SearchField = () => {
  return (
    <TextField className={styles.SearchField}id="outlined-basic" label="Search for user" variant="outlined" />
    )
}
