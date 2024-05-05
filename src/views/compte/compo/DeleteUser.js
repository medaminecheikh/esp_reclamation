import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
function DeleteUser({deleteUser}) {
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
          <IconButton disabled={!deleteUser} aria-label="delete" size="meduim" onClick={handleClickOpen} color="error">
                <DeleteIcon fontSize="inherit" />
              </IconButton>
<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are sure you want to delete account {deleteUser?.username}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button color='error' onClick={handleClose} autoFocus>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}

export default DeleteUser