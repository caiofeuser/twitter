import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate, } from "react-router-dom";



function SearchBar(props) {

  let navigate = useNavigate();


  const handleReRouter = (id) => {
    if (id !== undefined) {
      navigate(`/user/${id}`)
    }
  }

  return (
    <Autocomplete
      disablePortal
      getOptionLabel={(option) =>
        props.usersList.includes(option) ? option : ''
      }
      id="combo-box-demo"
      options={props.usersList}
      onChange={(e, value) => { handleReRouter(props.users.find(u => u.username == value)?.id) }}
      sx={{ width: 300 }}
      renderInput={(params) => {
        return (
          <div>
            <TextField {...params} label="Usuários" variant='standard' color='warning'
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonSearchIcon />
                  </InputAdornment>
                )
              }}
            />
          </div>
        )
      }}
    />
  );

}

export default SearchBar;