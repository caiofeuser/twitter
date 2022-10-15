import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useParams } from 'react-router-dom';

function Header() {
  let { user, logoutUser } = useContext(AuthContext);
  const { id } = useParams();

  console.log(user)




  return (
    <div className="header" style={{ display: 'flex',}}>
      <div style={{ marginLeft:'1rem' }}>
        <Link to="/">
        <img src="81609.png" style={{ height: '50px' }} />
        </Link>
      </div>
      <div style={{ marginLeft:'auto', marginRight:'3%'  }}>
        <ul>
          <li><Link to="/"><img src="home.svg"/></Link></li>
          {user ? (
            <li><span onClick={logoutUser}><img src="quit.png" style={{ width:'24px' }}/></span></li>
          ) : (
            <>
              <li><Link to="/login"><img src="login.png" style={{ width:'24px' }}/></Link></li>
              <li><Link to="/register">Cadastrar</Link></li>
            </>
          )}
          {user && <li><Link to={`/user/${user.user_id}`} >Bem-vindo, {user.username}</Link></li>}
        </ul>
      </div>
    </div>
  );
};

export default Header;
