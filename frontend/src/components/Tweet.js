import React from "react";
import useAxios from '../utils/useAxios';
import Comment from "./Comment";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Cancel from '@mui/icons-material/Cancel';

function Tweet(props) {
  const api = useAxios();
  const [likes, setLikes] = React.useState([]);
  const [globalLikes, setGlobalLikes] = React.useState([]);
  const [countLikes, setCountLikes] = React.useState(0);
  const [isLiked, setIsLiked] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [comments, setComments] = React.useState([])
  const [openComments, setOpenComments] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const [commentInput, setCommentInput] = React.useState(false);


  React.useEffect(() => {
    api.get('likes/get')
      .then(res => {
        setGlobalLikes(res.data.filter(r => r.tweet == props.id));
        setLikes(res.data.filter(obj => obj.user === props.userLoged));
        handleLikeCount(res.data);
      })
    api.get('users/')
      .then(res => {
        setUsers(res.data)
      })
    api.get('comments/')
      .then(res => {
        setComments(res.data)
      }
      )
  }, []);

  const handleGet = () => {
    api.get('likes/get')
      .then(res => {
        setGlobalLikes(res.data.filter(r => r.tweet == props.id));
        setLikes(res.data.filter(obj => obj.user === props.userLoged));
        handleLikeCount(res.data);
      })
    api.get('comments/')
      .then(res => {
        setComments(res.data)
      }
      )
    api.get('follows/')
      .then(res => {
        props.setFollowigs(res.data.filter(f => f.user == props.userLoged));
        props.setFollowers(res.data.filter(f => f.following == props.userLoged));
      })
  }

  const handleLikeCount = (array) => {
    setCountLikes((array.find(lk => lk.tweet == props.id))
      ? (array.filter(lk => lk.like == true).filter(lk => lk.tweet == props.id).length)
      : 0)
  }

  const handlePostLike = () => {
    if (likes.find(lk => lk.tweet == props.id)) {
      api.delete(`likes/delete/${(likes.find(like => like.tweet === props.id)).id}/`)
        .then(res => {
          handleGet();
        })
    } else {
      let postData =
      {
        tweet: props.id,
        user: props.user,
      }
      api.post("likes/add/", postData).then(res => {
        handleGet();
      })
    }
  }

  const handleOpenComment = () => {
    if (openComments) {
      setOpenComments(false);
    } else {
      setOpenComments(true);
    }
  }

  const handlePostComment = () => {
    let postData = {
      comment: comment,
      user: props.userLoged,
      tweet: props.id

    }
    api.post('comments/add/', postData).then(res => {
      handleGet();
    })
    setOpenComments(true);
    setComment('');
  }

  const handleOpenCommentInput = () => {
    if (commentInput) {
      setCommentInput(false);
    } else {
      setCommentInput(true)
      setOpenComments(true);
    }
  }

  const handleFollow = () => {
    if (props.followings.find(o => o.following === props.user)) {
      api.delete(`follows/delete/${(props.followings.find(o => o.following === props.user)).id}/`)
        .then(r => { handleGet(); })
    } else {
      let postData = {
        user: props.userLoged,
        following: props.user
      }
      api.post('follows/add/', postData).then(res => {
        handleGet();
      })
    }
  }


  return (
    <Paper elevation={2}
      style={{
        padding: '1rem', borderBottom: 'solid 1px lightgray',
        height: 'auto',
        marginBottom: '20px',
        borderRadius: '0',
        background: '#fbeee4'
      }}>
      <div style={{ marginLeft: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginRight: '1rem' }}>
          <div style={{ display: 'flex', }}>
            {props.isInProfile ?
              (
                <Typography sx={{
                  backgroundColor: '#F8C471',
                  padding: '0.5rem',
                  fontWeight: 'bold',
                  borderRadius: '5px',
                  marginTop: '.8rem',
                  marginBottom: '.8rem',
                  '&:hover': {
                    background: '#F39C12'
                  }
                }}>
                  {users.find(r => r.id == props.user)?.username} disse:
                </Typography>
              ) :
              (
                <Link
                  style={{ textDecoration: 'none', color: 'black', marginRight: '1rem' }}
                  to={`user/${users.find(item => item.id == props.user)?.id}`} >
                  <Typography sx={{
                    backgroundColor: '#F8C471',
                    padding: '0.5rem',
                    fontWeight: 'bold',
                    borderRadius: '5px',
                    marginTop: '.8rem',
                    marginBottom: '.8rem',
                    '&:hover': {
                      background: '#F39C12'
                    }
                  }}>
                    {users.find(r => r.id == props.user)?.username} disse:
                  </Typography>
                </Link>
              )
            }
            {props.userLoged == props.user ? null : (
              <Button
                sx={{
                  margin: '1rem', color: '#FF720A', marginLeft: '3rem',
                  border: 'none', borderRadius: '6px',
                  '&:hover': { fontWeight: 'bold', color: 'red' }
                }}
                onClick={handleFollow}
              >
                {props.followings?.find(o => o.following === props.user) ?
                  'Deixar de seguir' : 'Seguir'}
              </Button>
            )}

          </div>
          {props.user == props.userLoged
            ? (<Button
              onClick={() => { props.handleDelete(props.id) }}
              style={
                {
                  fontWeight: 'bold',
                  height: '2rem',
                  marginTop: '0.8rem',
                  borderStyle: 'none',
                  background: 'none',
                  borderRadius: '5px',
                  padding: '0 0.7rem 0 0.7rem'

                }
              }>
              <Delete
                sx={{ color: '#0000008a', '&:hover': { color: '#FF3A3A' } }}
              />
            </Button>) :
            null
          }

        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginRight: '2rem' }}>
          <Typography style={{ width: '85%', padding: '1rem 1rem 2rem 0', borderRadius: '5px', borderTop: '1px solid white' }}>
            {props.tweet}</Typography>
          <div style={{ marginLeft: '2rem' }}>
            <ToggleButton
              disableRipple
              value="like"
              sx={{
                border: 'none', marginLeft: '0.5rem',
                '&.Mui-selected, &.Mui-selected:hover': { color: '#FF720A', background: 'none' },
                '&:hover': { background: 'none' }
              }}
              selected={
                ((likes.find(lk => lk.tweet == props.id)) != undefined ? true : false) // da merda se n fizer isso
              }
              onChange={e => {
                handlePostLike();
                handleLikeCount(globalLikes);
              }}
            >
              <ThumbUpIcon />
            </ToggleButton>
            <span style={{ fontFamily: "roboto", fontWeight: 'bold', }}>{globalLikes.length}</span>
          </div>
        </div>
        <div style={{ display: 'flex', marginRight: '2rem', justifyContent: 'space-between' }}>
          {commentInput ?
            (<div style={{ width: '85%' }}>
              <TextField
                onChange={e => setComment(e.target.value)}
                onKeyPress={e => { if (e.key === 'Enter') { handlePostComment() } }}
                fullWidth
                value={comment}
                color='warning'
                variant='standard'
                placeholder='Escreva sua resposta'
              >
              </TextField>
              <div style={{ marginTop: '2rem' }}>
                <Button onClick={handlePostComment}
                  sx={{
                    border: 'none', padding: '0.5rem', borderRadius: '10px', color: '#FF720A', fontWeight: 'bold',
                    '&:hover': { color: '#d7691a' }
                  }}
                >
                  Enviar
                </Button>
                <IconButton onClick={handleOpenCommentInput}
                  sx={{
                    width: '40px',
                    color: '#0000008a',
                    height: '40px',
                    padding: '0',
                    marginLeft: '3rem',
                  }}
                >
                  <Cancel
                    sx={{ "&:hover": { color: '#FF3A3A' } }}
                  />
                </IconButton>
              </div>
            </div>
            )
            : (<Button
              onClick={handleOpenCommentInput}
              sx={{
                background: '#FF720A', color: 'white', marginBottom: '1rem',
                '&:hover': { background: '#d7691a' }, fontWeight: 'bold', verticalAlign: 'bottom'
              }}
            >Comentar
            </Button>)}
          {comments.filter(r => r.tweet == props.id).length > 0 ? (
            <Button
              disableFocusRipple
              sx={{
                border: 'none', padding: '0.5rem', borderRadius: '10px', color: '#FF9343',
                '&:hover': { color: '#FF720A' }
              }}
              onClick={handleOpenComment}
            >
              {openComments ? (<span>Esconder comentários</span>) : (<span>Mostrar comentários</span>)}
            </Button>
          ) : null}

        </div>
        <div >
          {openComments ? (
            comments.map((comment) => {
              if (comment.tweet == props.id) {
                return (
                  <div style={{ marginTop: '2rem', marginRight: '2rem', marginLeft: "2rem", borderLeft: '1px solid #FF720A', paddingLeft: '1rem' }}>
                    <Comment
                      key={comment.id} // pq ele ainda pede uma key?
                      comment={comment.comment}
                      user={comment.user}
                      userLoged={props.userLoged}
                      id={comment.id}
                      handleGet={handleGet}
                    />
                  </div>
                )
              }
            })
          ) : null}
        </div>
      </div>
    </Paper>
  );
}

export default Tweet;