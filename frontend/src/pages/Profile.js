import { useContext, useEffect, useState } from 'react';
import useAxios from '../utils/useAxios';
import Tweet from '../components/Tweet';
import AuthContext from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography'



function Profile() {

  let { user } = useContext(AuthContext)
  const api = useAxios();
  const [notes, setNotes] = useState([]);
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  

  useEffect(() => {
    handleGet();
      }, []);

  const handleGet = () => {
    api.get('notes')
      .then(res => {
        setNotes(res.data.filter( note => note.user === parseInt(id)))
      })
    api.get('users')
      .then(res => {
        setUsers(res.data)

      })
  }

  const handleDelete = (id) => {
    if (id !== undefined) {
      api.delete(`notes/delete/${id}/`)
        .then(res => {
          setNotes(notes.filter(note => note._id !== id))
          handleGet();
        })
  }}

  

  return (
    <div style={{ margin:' 0 1rem 0 1rem ' }}>
    <Typography 
      variant='h4'
      sx={{ fontWeight:'bold', margin:'1rem 0 1rem 0' }}
    >
      {(user.user_id == parseInt(id)) ? ('Seus tweets') : 
      (`Tweets de 
      ${users.find( user => user.id == parseInt(id))?.username}
      `)}
      </Typography>
      {notes.map(item => (
        <Tweet
          key={item.id}
          id={item.id}
          user={item.user}
          tweet={item.tweet}
          handleDelete={handleDelete}
          userLoged={user.user_id}
        />
      ))}
    </div >
  );
}

export default Profile;