import { AuthProvider } from "../context/AuthContext";
import React from "react";
import useAxios from '../utils/useAxios';


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
      <p style={{ fontWeight: 'bold' }}>
        {users.find(item => item.id == props.user)?.username} respondeu:
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>{props.comment}</p>
        <button
          onClick={() => handleDelete(props.id)}
          style={{
            fontWeight: 'bold',
            height: '2rem',
            marginTop: '0.8rem',
            marginRight: '1rem',
            borderStyle: 'none',
            background: 'lightPink',
            borderRadius: '5px',
            padding:'0 0.7rem 0 0.7rem'
          }}>
          X
        </button>
      </div>
      <hr></hr>
    </div>
  );
}

export default Comment;