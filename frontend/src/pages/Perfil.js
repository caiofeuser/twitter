import { useContext, useEffect, useState } from 'react';
import useAxios from '../utils/useAxios';
import Tweet from '../components/Tweet';
import AuthContext from '../context/AuthContext';


function Perfil() {


  let { user } = useContext(AuthContext)
  const api = useAxios();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    handleGet();
    console.log(user.user_id) // user de quem entrou
  }, []);


  const handleGet = () => {
    api.get('notes')
      .then(res => {
        setNotes(res.data)
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
    <h2>Seus tweets</h2>
      {notes.filter(r => r.user == user.user_id).map(item => (
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

export default Perfil;