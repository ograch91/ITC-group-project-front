import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import styles from '../SearchField/SearchField.module.css';

export const SearchField = () => {
  const usersList = [
    { Name: 'The Shawshank Redemption', id: 1234 },
    { Name: 'newman', id: 4321 },
    { Name: 'BizzaroJerry', id: 1138 },
  ];

  return (
    <div className={styles.SearchField}>
      <Autocomplete
        freeSolo
        id="searchField"
        disableClearable
        options={usersList.map(option => option.Name)}
        renderInput={params => (
          <TextField
            {...params}
            label="Search for User"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </div>
  );
};
