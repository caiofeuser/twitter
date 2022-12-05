import { useContext, useEffect, useState } from 'react';
import useAxios from '../utils/useAxios';
import AuthContext from '../context/AuthContext';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Feed from '../components/Feed';
import SearchBar from '../components/SearchBar';
import UserInfo from '../components/UserInfo';
import TextInput from '../components/TextInput';
import Approving from '../components/Approving';

function Home() {
  let { user } = useContext(AuthContext)
  const api = useAxios();
  const [notes, setNotes] = useState([]);
  const [likes, setLikes] = useState([]);
  const [thought, setThought] = useState('');
  const [users, setUsers] = useState([]);
  const [followings, setFollowigs] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [searchUser, setSearchUser] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGet = () => {
    api.get('notes/')
      .then(res => {
        setNotes(res.data);
        api.get('likes/get')
          .then(res => {
            setLikes(res.data)
            api.get('follows/')
              .then(res => {
                setFollowigs(res.data.filter(f => f.user == user.user_id));
                setFollowers(res.data.filter(f => f.following == user.user_id));
                api.get('users/')
                  .then(res => {
                    setUsers(res.data)
                    setLoading(true);
                  })
              })
          })
      });
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
      setThought('');
    })
  }

  const handleDelete = (id) => {
    if (id !== undefined) {
      api.delete(`notes/delete/${id}`)
        .then(res => {
          setNotes(notes)
          console.log(res.data)
          handleGet();
        })
    }
  }

  const usersList = [];
  users.forEach(element => {
    usersList.push(element.username)
  });

  return (
    <>
      {
        loading ? (
          <section>
            <Paper sx={{ margin: '1rem 1rem 0rem 1rem ', padding: '1rem', background: 'none' }} elevation={0}>
              <Typography
                sx={{ marginLeft: '1rem', marginBottom: '1rem', fontWeight: 'bold', }}
                variant='h4'
              >
                Página inicial de {user.username}
              </Typography>
              <div style={{ display: 'flex', marginLeft: '1rem', justifyContent: 'space-between', }}>
                <UserInfo
                  followers={followers}
                  followings={followings}
                />
                <div>
                  <div style={{ margin: ' 0 3rem 0 0' }}>
                    <SearchBar
                      usersList={usersList}
                      users={users}
                    />
                  </div>
                </div>
              </div>
            </Paper>
            <div style={{ marginLeft: '1rem', }} >
              <TextInput 
                thought={thought}
                setThought={setThought}
                handlePost={handlePost}

              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '2rem', paddingLeft: '0', }}>
              <Feed
                notes={notes}
                handleDelete={handleDelete}
                user={user}
                followers={followers}
                setFollowers={setFollowers}
                followings={followings}
                setFollowigs={setFollowigs}
              />
              <Approving 
                followers={followers}
                followings={followings}
                setFollowers={setFollowers}
                setFollowigs={setFollowigs}
                user={user}
                users={users}

              />
            </div>
          </section >
        ) : (
          <div style={{
            display: 'flex',
            justifyItems: 'center',
            height: '100vh',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <CircularProgress color='warning' />
          </div>
        )
      }
    </>

  );
}

export default Home;
