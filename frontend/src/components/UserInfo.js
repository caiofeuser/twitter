import Typography from '@mui/material/Typography';

function UserInfo(props) {


  return (
    <div style={{ display: 'flex' }}>
      <Typography
        variant='h5'
      >
        Seguidores: <span style={{ fontWeight: 'bold', marginRight: '2rem', color: '#FF720A' }}>
          {props.followers.filter(f => f.approved === true).length}</span>
      </Typography>
      <Typography
        variant='h5'
      >
        Seguindo: <span style={{ fontWeight: 'bold', color: '#FF720A' }}>{props.followings.length}</span>
      </Typography>
    </div>
  );
}

export default UserInfo;