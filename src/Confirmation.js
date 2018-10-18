import React from 'react';
import { confirmable } from 'react-confirm';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class Confirmation extends React.Component {

  render() {
    const {
      okLabel = 'Yes',
      cancelLabel = 'No',
      confirmation,
      show,
      proceed,
      dismiss,
      cancel,
    } = this.props;

    return (
      <Dialog
        open={show}
        TransitionComponent={Transition}
        onClose={dismiss}
      >
        <DialogTitle id="alert-dialog-slide-title">
          Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {confirmation}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel} color="primary">
            {cancelLabel}
          </Button>
          <Button onClick={proceed} color="secondary">
            {okLabel}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}



export default confirmable(Confirmation);
