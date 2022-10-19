import { useContext, useEffect, useState } from 'react';
import useAxios from '../utils/useAxios';
import Tweet from '../components/Tweet';
import AuthContext from '../context/AuthContext';
import MiniProfile from '../components/MiniProfile';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { useNavigate, useResolvedPath } from "react-router-dom";

function Home() {
  let { user } = useContext(AuthContext)
  let navigate = useNavigate();
  const api = useAxios();
  const [notes, setNotes] = useState([]);
  const [likes, setLikes] = useState([]);
  const [thought, setThought] = useState('');
  const [users, setUsers] = useState([]);
  const [followings, setFollowigs] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [searchUser, setSearchUser] = useState('');
  // const [arrayFilter, setArrayFilter] = useState([]);
  // const [notesFiltered, setNotesFiltered] = useState({});
  const [teste, setTeste] = useState('');

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
        // console.log(res.data)
        // console.log(res.data.filter(p=> p.username.includes('C')))
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
      setThought('');
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

  var arrayFilter = [];
  var notesFiltered = notes;
  followings.forEach(element => {
    arrayFilter.push(notes.filter(n => n.user == (element.following)));
  });
  notesFiltered = arrayFilter.flat()



  const usersList = [];
  users.forEach(element => {
    usersList.push(element.username)
  });

  const handleReRouter = (id) => {
    if (id !== undefined) {
      navigate(`/user/${id}`)
    }
  }

  return (
    <section>
      <Paper sx={{ margin: '1rem 1rem 0rem 1rem ', padding: '1rem', background: 'none' }} elevation={0}>
        <Typography
          sx={{ marginLeft: '1rem', marginBottom: '1rem', fontWeight: 'bold', }}
          variant='h4'
        >
          Página inicial de {user.username}
        </Typography>
        <div style={{ display: 'flex', marginLeft: '1rem', justifyContent: 'space-between', }}>
          <div style={{ display: 'flex' }}>
            <Typography
              variant='h5'
            >
              Seguidores: <span style={{ fontWeight: 'bold', marginRight: '2rem', color: '#FF720A' }}>{followers.length}</span>
            </Typography>
            <Typography
              variant='h5'
            >
              Seguindo: <span style={{ fontWeight: 'bold', color: '#FF720A' }}>{followings.length}</span>
            </Typography>
          </div>
          <div>
            <div style={{ margin: ' 0 5rem 0 0' }}>
              <Autocomplete
                disablePortal
                getOptionLabel={(option) =>
                  usersList.includes(option) ? option : ''
                }
                id="combo-box-demo"
                options={usersList}
                onChange={(e, value) => { handleReRouter(users.find(u => u.username == value)?.id) }}
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
            </div>
          </div>
        </div>
      </Paper>
      <div style={{ marginLeft: '1rem', }} >
        <TextField
          onKeyPress={e => { if (e.key === 'Enter') { handlePost(); setThought('') } }}
          rows={2}
          color='warning'
          fullWidth
          multiline
          value={thought}
          label="Oque você está pensando?"
          sx={{
            marginLeft: '1rem', width: '50%', border: 'none', borderRadius: '4px',
            background: 'white', marginBottom: '1rem'
          }}
          onChange={e => { setThought(e.target.value); }}
        ></TextField>
        <Button
          onClick={() => { handlePost(); setThought('') }}
          sx={{
            marginLeft: '1rem', background: '#FF720A', color: 'white', marginBottom: '1rem',
            '&:hover': { background: '#B9770E' }, fontWeight: 'bold', verticalAlign: 'bottom'
          }}
          variant="contained"
        >
          Post!
        </Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '2rem' }}>
        <div style={{ width: '150vh', }}>
          {notesFiltered.length == 0 ? 
            <div style={{ display: 'flex', height: '100vh', marginTop:'5rem' }}> 
              <Typography variant='h5'
              sx={{ fontWeight: 'bold', color: '#FF720A' }}
              >
                Nenhuma publicação encontrada
              </Typography>
            </div> : 
          (
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
          )}
          
            
          
        </div>
      </div>
    </section>
  );
}

export default Home;
