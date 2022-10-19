import { useContext, useEffect, useState } from 'react';
import useAxios from '../utils/useAxios';
import Tweet from '../components/Tweet';
import AuthContext from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';



function Profile() {
  let { user } = useContext(AuthContext)
  const api = useAxios();
  const [followings, setFollowigs] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [notes, setNotes] = useState([]);
  const { id } = useParams();
  const [users, setUsers] = useState([]);


  useEffect(() => {
    handleGet();
  }, []);

  const handleGet = () => {
    api.get('notes')
      .then(res => {
        setNotes(res.data.filter(note => note.user === parseInt(id)))
      })
    api.get('users')
      .then(res => {
        setUsers(res.data)
      })
    api.get('follows/')
      .then(res => {
        setFollowigs(res.data.filter(f => f.user == user.user_id));
        setFollowers(res.data.filter(f => f.following == user.user_id));
      })
  }

  const handleDelete = (id) => {
    if (id !== undefined) {
      api.delete(`notes/delete/${id}/`)
        .then(res => {
          setNotes(notes.filter(note => note._id !== id))
          handleGet();
        })
    }
  }


  const handleFollow = () => {
    if (followings.find(o => o.following === parseInt(id))) {
      api.delete(`follows/delete/${(followings.find(o => o.following === parseInt(id))).id}/`)
        .then(r => { handleGet(); })
    } else {
      let postData = {
        user: user.user_id,
        following: parseInt(id)
      }
      api.post('follows/add/', postData).then(res => {
        handleGet();
      })
    }
  }

  return (
    <div>
      {followings.find(u => u.following === parseInt(id) || user.user_id == parseInt(id) ) !== undefined ? (
        <div style={{ margin: ' 0 1rem 0 1rem ' }}>
          <Typography
            variant='h4'
            sx={{ fontWeight: 'bold', margin: '1rem 0 1rem 0' }}
          >
            {(user.user_id == parseInt(id)) ? ('Seus tweets') :
              (`Tweets de
      ${users.find(user => user.id == parseInt(id))?.username}
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
              followers={followers}
              setFollowers={setFollowers}
              followings={followings}
              setFollowigs={setFollowigs}
            />
          ))}
        </div >
      ) : (
        <div style={{ margin: ' 0 1rem 0 1rem ' }}>
          <Typography
            variant='h4'
            sx={{ fontWeight: 'bold', margin: '1rem 0 1rem 0' }}
          >
            {(user.user_id == parseInt(id)) ? ('Seus tweets') :
              (`Tweets de 
      ${users.find(user => user.id == parseInt(id))?.username}
      `)}
          </Typography>
          <div style={{
            background: '#FF720A1A',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '1rem',
            margin: '1rem 0 1rem 0',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '1rem', alignItems: 'center', }}>
              <Typography
                variant='h6'
                sx={{
                  fontWeight: 'bold',
                  margin: '1rem 0 0rem 0',
                  textAlign: 'center',
                  color: '#FF720A',
                  padding: '0.5rem 0 0.5rem 0'
                }}
              >
                {`Você não segue ${users.find(user => user.id == parseInt(id))?.username}`}
              </Typography>
              <Button
                sx={{
                  color: 'white',
                  background: '#FF720A',
                  margin: '1rem 0 1rem 0',
                  width: '10%',
                  '&:hover': {
                    background: '#d7691a',
                  }
                }}
                onClick={() => { handleFollow();}}
              >
                Seguir
              </Button>
            </div>
          </div>
        </div>
      )
      }
    </div>
  );
}

export default Profile;