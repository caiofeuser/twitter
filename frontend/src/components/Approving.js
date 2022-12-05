import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import MiniProfile from '../components/MiniProfile';


function Approving(props) {
  return (
    <div style={{ marginRight: '3rem', marginLeft: '5rem', padding: '0rem 1rem 1rem 1rem', height: 'auto' }}>
      <Accordion sx={{
        borderRadius: '5px',
        borderTop: '5px solid #FF720A',
        background: '#fbeee4',
        paddignBottom: '1rem'
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography
            variant='h5'
            align='center'
            mr={1}
            sx={{ fontWeight: 'bold', }}
          >
            Solicitações à seguir
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {props.followers.filter(f => f.approved == false).length == 0 ? (
            <Typography
              variant='h7'
              align='center'
              sx={{ fontWeight: 'bold', }}
            >
              Nenhuma solicitação
            </Typography>
          ) : (
            props.followers.filter(f => f.approved == false).map(f => (
              <MiniProfile
                key={f.id}
                id={f.id}
                username={props.users.find(u => u.id == f.user)?.username}
                followers={f}
                userLoged={props.user.user_id}
                setFollowers={props.setFollowers}
                followings={props.followings}
                handleGet={props.handleGet}
              />
            )))
          }
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Approving;