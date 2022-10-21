import { useEffect } from "react";
import { useState } from 'react';
import react from "react";
import api from '../services/api';
import AuthContext from '../context/AuthContext';



function Follow() {
  const [followings, setFollowigs] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [users, setUsers] = useState([]);
  const api = useAxios();
  const { user } = useContext(AuthContext)
  


  const handleGet = () => {
    api.get('follows/')
      .then(res => {
        setFollowigs(res.data.filter(f => f.user == user.user_id));
        setFollowers(res.data.filter(f => f.following == user.user_id));
      })
    api.get('users/')
      .then(res => {
        setUsers(res.data)
      })
  }


  return (
    <div>

    </div>
  );
}

export default function Follow;