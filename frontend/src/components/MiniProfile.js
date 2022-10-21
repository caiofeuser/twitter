import useAxios from "../utils/useAxios";
import { useContext, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IconButton from '@mui/material/IconButton';

function MiniProfile(props) {
  const api = useAxios();

  useEffect(() => {
  }, []);

  const handleApproval = (id) => {
    console.log({
      "id": id,
      "user": props.followers.user,
      "following": props.userLoged,
      "approved": true
    })
    api.put(`follows/update/${id}/`,
      {
        "user": props.followers.user,
        "following": props.userLoged,
        "approved": true
      }
    )
      .then(res => {
        props.handleGet();
      })
  }

  return (
    <div style={{
      marginRight: '2rem', minWidth: '14rem', marginLeft: '1rem', marginTop: '1rem', height: '3rem',
      borderLeft: "3px solid #FF720A ", paddingLeft: '1rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h6'>{props.username + ' ' + props.id}</Typography>
        <IconButton
          sx={{
            margin: '0 0 1rem 2rem', 
            '&:hover': {
              backgroundColor: '#fbeee4',
            },
            borderRadius: '50%',
            padding: '1rem 1rem 1rem 1rem',
          }}
          onClick={() => { handleApproval(props.id); }}
        >
          <CheckCircleIcon
            sx={{
              color: '#FF720A',
              '&:hover': { 
                color: '#d7691a',
              },
            }}
          />
        </IconButton>
      </div>
    </div>
  );
}

export default MiniProfile;