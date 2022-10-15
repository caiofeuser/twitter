﻿import React from "react";
import useAxios from '../utils/useAxios';
import Comment from "./Comment";
import { Link } from "react-router-dom";

function Thought(props) {

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
    .then( res  => {
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


  }

  const handleOpenCommentInput = () => {
    if (commentInput) {
      setCommentInput(false);
    } else {
      setCommentInput(true);
    }
  }

  const handleFollow = () => {
    if(props.followings.find( o => o.following === props.user)){
      api.delete(`follows/delete/${(props.followings.find( o => o.following === props.user)).id}/`)
      .then( r => { handleGet();})
    } else {
    let postData = {
      user: props.userLoged,
      following: props.user
    }
    api.post('follows/add/', postData).then(res => {
      handleGet();
    })}
  }


  return (
    <div style={{ background: '#cce7ff', borderRadius: '10px', margin: '2rem', paddingBottom: '1rem', height:'200px' }}>
      <div style={{ marginLeft: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginRight: '1rem' }}>
          <div style={{ display:'flex' }}>
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
              to={`user/${users.find(item => item.id == props.user)?.id}`} >
              <p style={{
                background: 'LightSkyBlue',
                borderRadius: '6px',
                padding: '0.2rem', color: '',
                fontWeight: 'bold'
              }}>
                {users.find(r => r.id == props.user)?.username} disse:
              </p>
            </Link>
            <button 
            style={{ margin:'1rem', background:'LightSkyBlue', 
            border:'none', fontWeight:'bold', borderRadius:'6px'}}  
            onClick={handleFollow}
            >
              {props.followings?.find( o => o.following === props.user) ?
              'Deixar de seguir' : 'Seguir'}
            </button>
          </div>
          {props.user == props.userLoged
            ? (<button
              onClick={() => { props.handleDelete(props.id) }}
              style={
                {
                  fontWeight: 'bold',
                  height: '2rem',
                  marginTop: '0.8rem',
                  borderStyle: 'none',
                  background: 'lightPink',
                  borderRadius: '5px',
                  padding: '0 0.7rem 0 0.7rem'

                }
              }>
              X
            </button>) :
            null
          }

        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginRight: '2rem' }}>
          <span style={{ width: '85%', padding: '1rem', borderRadius: '5px', borderTop: '1px solid white' }}>
            {props.tweet}</span>
          <div style={{ marginLeft: '2rem' }}>
            <label >
              Like:
              <input
                type="checkbox"
                checked={
                  (likes.find(lk => lk.tweet == props.id))
                  // ? true
                  // : false}
                }
                onChange={e => { handlePostLike(); handleLikeCount(globalLikes) }}
                style={{ marginLeft: '0.5rem', }}
              />
            </label>
            <p>Número de likes:{globalLikes.length}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', marginRight: '2rem', justifyContent: 'space-between' }}>
          {commentInput ?
            (<div>
              <input type="text" onChange={e => setComment(e.target.value)}></input>
              <button onClick={handlePostComment}>
                Enviar
              </button>
              <button onClick={handleOpenCommentInput}>x</button>
            </div>
            )
            : (<button
              onClick={handleOpenCommentInput}
              style={{
                background: 'LightSkyBlue', border: 'none', padding: '0.5rem', borderRadius: '10px',
                '&:hover': { background: 'red' }
              }}
            >Comentar
            </button>)}
          {comments.filter(r => r.tweet == props.id).length > 0 ? (
            <button
              style={{ background: 'LightSkyBlue', border: 'none', padding: '0.5rem', borderRadius: '10px' }}
              onClick={handleOpenComment}
            >
              {openComments ? (<span>Esconder comentários</span>) : (<span>Mostrar comentários</span>)}
            </button>
          ) : null}

        </div>
        <div>
          {openComments ? (
            comments.map((comment) => {
              if (comment.tweet == props.id) {
                return (
                  <Comment
                    key={comment.id}
                    comment={comment.comment}
                    user={comment.user}
                    userLoged={props.userLoged}
                    id={comment.id}
                    handleGet={handleGet}
                  />
                )
              }
            })
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Thought;