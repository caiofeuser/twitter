import Typography from '@mui/material/Typography';
import Tweet from '../components/Tweet';

function Feed(props) {

  const handleFilter = (id) => {
    return props.followings.filter(f => f.following === id && f.approved).length > 0 || id == props.user.user_id;
  }


  return (
    <div style={{ width: '140vh', }}>
      {props.notes.filter(n => handleFilter(n.user)).length == 0 ?
        <div style={{ display: 'flex', height: '100vh', marginTop: '5rem', }}>
          <Typography variant='h5'
            sx={{ fontWeight: 'bold', color: '#FF720A' }}
          >
            Nenhuma publicação encontrada
          </Typography>
        </div> :
        (
          props.notes.filter(n => handleFilter(n.user)).map(item => (
            <Tweet
              key={item.id}
              id={item.id}
              user={item.user}
              tweet={item.tweet}
              handleDelete={props.handleDelete}
              userLoged={props.user.user_id}
              followers={props.followers}
              setFollowers={props.setFollowers}
              followings={props.followings}
              setFollowigs={props.setFollowigs}
              isInProfile={false}
            />
          ))
        )}
    </div>
  )
}

export default Feed;