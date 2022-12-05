import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function TextInput(props) {
  return (
    <>
      <TextField
        onKeyPress={e => { if (e.key === 'Enter') { props.handlePost(); props.setThought('') } }}
        rows={2}
        color='warning'
        fullWidth
        multiline
        value={props.thought}
        label="Oque você está pensando?"
        sx={{
          marginLeft: '1rem', width: '50%', border: 'none', borderRadius: '4px',
          background: 'white', marginBottom: '1rem'
        }}
        onChange={e => { props.setThought(e.target.value); }}
      ></TextField>
      <Button
        onClick={() => { props.handlePost(); props.setThought('') }}
        sx={{
          marginLeft: '1rem', background: '#FF720A', color: 'white', marginBottom: '1rem',
          '&:hover': { background: '#B9770E' }, fontWeight: 'bold', verticalAlign: 'bottom'
        }}
        variant="contained"
      >
        Post!
      </Button>
    </>
  );
}

export default TextInput;