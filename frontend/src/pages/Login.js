import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Button from '@mui/material/Button';
import TextFileld from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';

function Login() {
  const { loginUser } = useContext(AuthContext);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    username.length > 0 && loginUser(username, password);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{
        background: 'white',
        padding: '3rem',
        marginTop: '3rem',
        borderRadius: '10px',
        border: '1px solid #0000001a',
      }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 'bold', color: '#FF720A', textAlign: 'center' }}
        >
          Faça seu Login:
        </Typography>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <TextFileld
            label="Insira seu nome de usuário"
            variant="outlined"
            name="username"
            placeholder='Nome'
            color='warning'
            sx={{ mt: 5, minWidth: '20rem' }}
            onChange={(e) => setUsername(e.target.value)}

          >
          </TextFileld>
          <TextFileld
            label="Insira sua senha"
            variant="outlined"
            name="password"
            placeholder='Senha'
            color='warning'
            sx={{ mt: 3, mb: 3, minWidth: '20rem' }}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          >
          </TextFileld>
          <Button
            onClick={handleSubmit}
            sx={{
              color: 'white',
              background: '#FF720A',
              margin: '1rem 0 1rem 0',
              padding: '0.5rem 0 0.5rem 0',
              '&:hover': {
                background: '#d7691a',
              }
            }}>
            Login
          </Button>
          <Typography
          >
            Não tem uma conta? 
            <a href="/register" style={{ textDecoration: 'none', color: '#FF720A' }}> Crie uma agora!</a>
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Login;
