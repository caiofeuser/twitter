import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

function Login() {
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  };

  return (
    <section >
      <form onSubmit={handleSubmit}>
        <h1 style={{ marginLeft:'1rem'}}>Login</h1>
        <hr />
        <label htmlFor="username" style={{ marginLeft:'1rem'}}>Username</label>
        <br />
        <input style={{ marginLeft:'1rem'}} type="text" id="username" placeholder="Username" />
        <br />
        <br />
        <label style={{ marginLeft:'1rem'}} htmlFor="password">Password</label>
        <br />
        <input style={{ marginLeft:'1rem'}} type="password" id="password" placeholder="Password" />
        <br />
        <br />
        <button style={{ marginLeft:'1rem'}} type="submit">Login</button>
      </form>
    </section>
  );
}

export default Login;
