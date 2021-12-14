import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs'

function AddTraining(props) {
    const [training, setTraining] = React.useState([{
        date: new Date,     
        duration: "",  
        activity: "",
        customer: ""
    }]);

    const inputChanged = event => {
        setTraining({...training, [event.target.name]: event.target.value})
    }
    

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSave = () => {
        training.date=dayjs(training.date).toISOString();
        props.addTraining(training);
        handleClose();
    }

    return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
          <TextField
            
            margin="dense"
            name='date'
            value={training.date}
            onChange={inputChanged}
            label="Date"
            
            fullWidth
            variant="standard"
          />
          <TextField
            
            margin="dense"
            name='activity'
            value={training.activity}
            onChange={inputChanged}
            label="Activity"
            
            fullWidth
            variant="standard"
          />
          <TextField
            
            margin="dense"
            name='duration'
            value={training.duration}
            onChange={inputChanged}
            label="Duration"
            
            fullWidth
            variant="standard"
          />
          <TextField
            
            margin="dense"
            name='customer'
            value={training.customer}
            onChange={inputChanged}
            label="Customers Link"
            
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddTraining;