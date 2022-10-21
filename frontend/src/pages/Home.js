import { useContext, useEffect, useState } from 'react';
import useAxios from '../utils/useAxios';
import Tweet from '../components/Tweet';
import AuthContext from '../context/AuthContext';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { useNavigate, } from "react-router-dom";
import MiniProfile from '../components/MiniProfile';
import CircularProgress from '@mui/material/CircularProgress';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';

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
  const [defaultQuantity, setDefaultQuantity] = useState(5);
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
          setNotes(notes.filter(note => note._id !== id))
          handleGet();
        })
    }
  }

  const Pagination = (json) => {
    return json.slice(0, defaultQuantity);
  }

  var arrayFilter = [];
  var notesFiltered = notes;
  followings.forEach(element => {
    arrayFilter.push(notes.filter(n => n.user == (element.following)));
  });
  notesFiltered = arrayFilter.flat()

  // const handleFilter = (id) => {
  //   console.log(followings)
  //   followings.forEach(element => {
  //     if (element.following == id) {
  //       return true;
  //     }
  //   })
  //   return false;
  // }


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
                <div style={{ display: 'flex' }}>
                  <Typography
                    variant='h5'
                  >
                    Seguidores: <span style={{ fontWeight: 'bold', marginRight: '2rem', color: '#FF720A' }}>
                      {followers.filter(f => f.approved === true).length}</span>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '2rem', paddingLeft: '0', }}>
              <div style={{ width: '140vh', }}>
                {notesFiltered.length == 0 ?
                  <div style={{ display: 'flex', height: '100vh', marginTop: '5rem', }}>
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
                        isInProfile={false}
                      />
                    ))
                  )}
              </div>
              <div style={{ marginRight: '3rem', marginLeft: '5rem', padding: '0rem 1rem 1rem 1rem', height: 'auto' }}>
                <Accordion sx={{
                  borderRadius: '5px',
                  borderTop: '5px solid #FF720A',
                  background: '#fbeee4',
                  paddignBottom: '1rem'
                }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography
                      variant='h5'
                      align='center'
                      sx={{ fontWeight: 'bold', }}
                    >
                      Solicitações à seguir
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {Pagination(followers).filter(f => f.approved == false).map(f => (
                      <MiniProfile
                        key={f.id}
                        id={f.id}
                        username={users.find(u => u.id == f.user)?.username}
                        followers={f}
                        userLoged={user.user_id}
                        setFollowers={setFollowers}
                        followings={followings}
                        handleGet={handleGet}
                      />
                    ))}
                    <Button
                      sx={{
                        marginTop: '2rem', background: '#FF720A', color: 'white', marginLeft: '2rem',
                        '&:hover': { background: '#B9770E' }, fontWeight: 'bold', verticalAlign: 'bottom'
                      }}
                      onClick={() => { defaultQuantity === 5 ? setDefaultQuantity(Infinity) : setDefaultQuantity(5) }}
                    >
                      {defaultQuantity === 5 ? 'Mostrar todos' : 'Mostrar menos'}
                    </Button>
                  </AccordionDetails>
                </Accordion>

              </div>
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
