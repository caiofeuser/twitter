import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';


import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Header() {
  let { user, logoutUser } = useContext(AuthContext);
  const { id } = useParams();


  return (
    <Paper className="header" sx ={{ display: 'flex',borderRadius:'0', background:'#858585'}} elevation={2}>
      <div style={{ marginLeft:'1rem' }}>
        <Link to="/">
        <img src="logo.svg" style={{ height: '50px',  }} />
        </Link>
      </div>
      <div style={{ marginLeft:'auto', marginRight:'3%'  }}>
        <ul>
          <li><Link to="/"><HomeIcon style={{ color:'white' }} /></Link></li>
          {user ? (
            <li><span onClick={logoutUser}><LogoutIcon style={{ color:'white' }} /></span></li>
          ) : (
            <>
              <li><Link to="/login"><LoginIcon sx={{ color:'white'}}/></Link></li>
              <li style={{ fontFamily:'roboto'}}>
                <Link to="/register"
                  style={{ color:'#FF720A', textDecoration:'none', fontWeight:'bold', fontSize:'1.2rem', }}
                >
                  Cadastrar
                </Link></li>
            </>
          )}
          {user && <li><Link to={`/user/${user.user_id}`}> <AccountCircleIcon sx={{ color:'white'}} /> </Link></li>}
        </ul>
      </div>
    </Paper>
  );
};

export default Header;
