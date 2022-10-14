import { useContext, useEffect, useState } from 'react';
import useAxios from '../utils/useAxios';
import Thought from '../components/Tweet';
import AuthContext from '../context/AuthContext';

function Home() {
  let { user } = useContext(AuthContext)
  const api = useAxios();
  const [notes, setNotes] = useState([]);
  const [likes, setLikes] = useState([]);
  const [thought, setThought] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  const handleGet = () => {
    api.get('notes/')
      .then(res => {
        setNotes(res.data);
        // console.log(res.data);
      });
    api.get('likes/get')
      .then(res => {
        setLikes(res.data)
      })
    // api.get('users/')
    //   .then(res => {
    //     setUsuarios(res.data)
    //     console.log(res.data)
    //   })
  }

  useEffect(() => {
    handleGet();
  }, []);

  const handlePost = () => {
    api.post('notes/add/', {
      tweet: thought,
      user: user.user
    }).then(res => {
      handleGet();
    })
  }

  const handleDelete = (id) => {
    if (id !== undefined) {
      api.delete(`notes/delete/${id}`)
        .then(res => {
          setNotes(notes.filter(note => note._id !== id))
          handleGet();
        })
    }
  }

  return (
    <section>
      <h1 style={{ marginLeft: '1rem' }}>Página inicial de {user.username}</h1>
      <hr />
      <div style={{ marginLeft: '1rem' }}>
        <label> Oque você está pensando?
          <input type="text"
            style={{
              marginLeft: '1rem', width: '50%', background: 'AliceBlue', border: 'none', padding: '1rem', borderRadius: '10px',
              border: '1px solid cce7ff', marginBottom:'2rem'
            }}
            onChange={e => { setThought(e.target.value); console.log(thought) }}
          ></input>
        </label>
        <button onClick={handlePost} style={{ marginLeft: '1rem' }}>Post!</button>
      </div>
      <div style={{ display: "grid", gridColumn: '1fr 3' }}>
        {notes.map(item => (
          <Thought
            key={item.id}
            id={item.id}
            user={item.user}
            tweet={item.tweet}
            handleDelete={handleDelete}
            userLoged={user.user_id}
          />
        ))
        }
      </div>
    </section>
  );
}

export default Home;
