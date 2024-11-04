
import PropTypes from "prop-types";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function ConfirmDialog ({ open, onClose, onConfirm, title, message, loading }){
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle id="confirm-dialog-title">{title ?? "Confirmar"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {message ?? "¿Está seguro que quiere realizar esta acción?"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant='outlined' disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          color="primary"
          autoFocus
          disabled={loading}
        >
         {loading? <CircularProgress /> : "Confirmar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;

ConfirmDialog.propTypes={
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
    message: PropTypes.string,
    title: PropTypes.string,
    loading:PropTypes.bool,
}
