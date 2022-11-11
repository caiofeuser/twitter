import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    registerUser(username, password, password2);
    navigate('/');
  };

  return (
    <section>
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
            Register
          </Typography>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <TextField
              type="text"
              id="username"
              onChange={e => setUsername(e.target.value)}
              placeholder="Insira seu suário"
              required
              label='Usuário'
              sx={{ mt: 5, minWidth: '20rem' }}

            />
            <TextField
              type="password"
              id="password"
              onChange={e => setPassword(e.target.value)}
              placeholder="Insira sua senha"
              required
              label='Senha'
              sx={{ mt: 3, mb: 3, minWidth: '20rem' }}

            />
            <TextField
              type="password"
              id="confirm-password"
              onChange={e => setPassword2(e.target.value)}
              placeholder="Confirme sua senha"
              label='Confirme a senha'
              required
              sx={{ mb: 3, minWidth: '20rem' }}

            />
            {password2 !== password ? 'As senhas não são iguais' : ''}
            <Button
              onClick={handleSubmit}
              sx={{
                color: 'white',
                background: '#FF720A',
                margin: '1rem 0 1rem 0',
                padding: '0.5rem 1rem 0.5rem 1rem',
                '&:hover': {
                  background: '#d7691a',
                }
              }}
              type="submit">
                
                Register
                
                </Button>
            <Typography
            >
              Volte para o login
              <a href="/register" style={{ textDecoration: 'none', color: '#FF720A' }}> Aqui!</a>
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
