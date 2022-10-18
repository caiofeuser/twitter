import { AuthProvider } from "../context/AuthContext";
import React from "react";
import useAxios from '../utils/useAxios';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Delete from '@mui/icons-material/Delete';

function Comment(props) {
  const api = useAxios();
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    api.get('users/')
      .then(res => {
        setUsers(res.data);
      })
  });


  const handleDelete = (id) => {
    if (id !== undefined) {
      api.delete(`comments/delete/${id}/`)
        .then(res => {
          props.handleGet();
        })
    }
  }

  return (
    <div>
      <Typography style={{ fontWeight: 'bold' }}>
        {users.find(item => item.id == props.user)?.username} respondeu:
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>{props.comment}</Typography>
        <Button
          onClick={() => handleDelete(props.id)}
          sx={{
            width: '40px',
            color: '#0000008a',
            height: '40px',
            padding: '0',
          }}>
          <Delete 
            sx = {{"&:hover": { color: '#FF3A3A' }}}
          />
        </Button>
      </div>
    </div>
  );
}

export default Comment;