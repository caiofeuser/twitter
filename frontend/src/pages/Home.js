import { useContext, useEffect, useState } from 'react';
import useAxios from '../utils/useAxios';
import Tweet from '../components/Tweet';
import AuthContext from '../context/AuthContext';
import MiniProfile from '../components/MiniProfile';

function Home() {
  let { user } = useContext(AuthContext)
  const api = useAxios();
  const [notes, setNotes] = useState([]);
  const [likes, setLikes] = useState([]);
  const [thought, setThought] = useState('');
  const [users, setUsers] = useState([]);
  const [followings, setFollowigs] = useState([]);
  const [followers, setFollowers] = useState([]);
  // const [arrayFilter, setArrayFilter] = useState([]);
  // const [notesFiltered, setNotesFiltered] = useState({});

  const handleGet = () => {
    api.get('notes/')
      .then(res => {
        setNotes(res.data);
      });
    api.get('likes/get')
      .then(res => {
        setLikes(res.data)
      })
    api.get('follows/')
      .then(res => {
        setFollowigs(res.data.filter(f => f.user == user.user_id));
        setFollowers(res.data.filter(f => f.following == user.user_id));
      })
    api.get('users/')
      .then(res => {
        setUsers(res.data)
      })
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


  let arrayFilter = [];
  let notesFiltered = notes;
  console.log(followings)
  followings.forEach(element => {
    arrayFilter.push(notes.filter(n => n.user == element.following));
  });
  notesFiltered = arrayFilter.flat()



  return (
    <section>
      <h1 style={{ marginLeft: '1rem', marginBottom: '0' }}>Página inicial de {user.username}</h1>
      <div style={{ display: 'flex', marginLeft: '1rem' }}>
        <h3>Seguidores: {followers.length}</h3>
        <h3 style={{ marginLeft: '1rem' }}>Seguindo: {followings.length}</h3>
      </div>
      <hr />
      <div style={{ marginLeft: '1rem' }}>
        <label> Oque você está pensando?
          <input type="text"
            style={{
              marginLeft: '1rem', width: '50%', background: 'AliceBlue', border: 'none', padding: '1rem', borderRadius: '10px',
              border: '1px solid cce7ff', marginBottom: '2rem'
            }}
            onChange={e => { setThought(e.target.value); console.log(thought) }}
          ></input>
        </label>
        <button onClick={handlePost} style={{ marginLeft: '1rem' }}>Post!</button>
      </div>
      <div style={{ display: 'flex', justifyContent:'space-between' }}>
        <div style={{ display: "grid", gridColumn: '1fr 3', width: '150vh' }}>
          {
            notesFiltered.map(item => (
              <Tweet
                key={item.id}
                id={item.id}
                user={item.user}
                tweet={item.tweet}
                handleDelete={handleDelete}
                userLoged={user.user_id}
                followers={followers}
                setFollowers={setFollowers}
                followings={followings}
                setFollowigs={setFollowigs}
              />
            ))
          }
        </div>
        <div style={{ display:'flex', flexDirection:'column', marginRight:'5rem' }}>
          <h3>Usuários</h3>
          {
            users.map(user => (
              <MiniProfile 
                key={user.id}
                username={user.username}
                handleGet={handleGet}
                user={user.id}
              />))
              }
        </div>
      </div>
    </section>
  );
}

export default Home;
