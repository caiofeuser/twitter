import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    registerUser(username, password, password2);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <hr />
        <label htmlFor="username">Username</label>
        <br />
        <input
          type="text"
          id="username"
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <br />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          id="password"
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <br />
        <br />
        <label htmlFor="confirm-password">Confirm Password</label>
        <br />
        <input
          type="password"
          id="confirm-password"
          onChange={e => setPassword2(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        <br />
        <br />
        {password2 !== password ? 'Passwords do not match' : ''}
        <button type="submit">Register</button>
      </form>
    </section>
  );
}

export default Register;
