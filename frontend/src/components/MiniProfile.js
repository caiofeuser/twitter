import useAxios from "../utils/useAxios";

function MiniProfile(props) {

  const api = useAxios();

  const handleFollow = () => {
    if(props.followings?.find( o => o.following === props.user)){
      api.delete(`follows/delete/${(props.followings?.find( o => o.following === props.user)).id}/`)
      .then( r => { props.handleGet();})
    } else {
    let postData = {
      user: props.userLoged,
      following: props.user
    }
    api.post('follows/add/', postData).then(res => {
      props.handleGet();
    })}
  }

  return(
    <div style={{ marginRight:'2rem', width:'200px' }}>
      <h4>{props.username}</h4>
      <button
        onClick={() => { handleFollow(); }}
      >
        seguir
      </button>
    <hr />
    </div>
  );
}

export default MiniProfile;