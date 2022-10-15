import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Profile from './pages/Profile';
import { useParams } from 'react-router-dom';




function App() {
  const { id } = useParams();
  console.log(id)
  return (
    <Router>
      <div>
        <AuthProvider>
          <Header />
          <Routes>
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            <Route element={<Profile />} path="/user/:id"  />
            <Route path="/" element={<PrivateRoute Component={Home} />} />
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
