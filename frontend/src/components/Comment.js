import { AuthProvider } from "../context/AuthContext";
import React from "react";
import useAxios from '../utils/useAxios';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';

function Comment(props) {
  const api = useAxios();
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    api.get('users/')
      .then(res => {
        setUsers(res.data);
      })
  },[]);


  const handleDelete = (id) => {
    if (id !== undefined) {
      api.delete(`comments/delete/${id}/`)
        .then(res => {
          props.handleGet();
        })
    }
  }

  return (
    <div style={{ marginBottom:'1rem'}}>
      <Typography style={{ fontWeight: 'bold' }}>
        {users.find(item => item.id == props.user)?.username} respondeu:
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>{props.comment}</Typography>
        {props.user == props.userLoged ? (
        <IconButton
          onClick={() => handleDelete(props.id)}
          sx={{
            width: '40px',
            height: '40px',
            padding: '0',
            background: 'none',
          }}>
          <Delete 
            sx = {{color: '#0000008a', "&:hover": { color: '#FF3A3A' }}}
          />
        </IconButton>

        ) : null}
      </div>
    </div>
  );
}

export default Comment;