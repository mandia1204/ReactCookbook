import React, {PropTypes} from 'react';
import {Dialog,FlatButton,RaisedButton} from 'material-ui';

const ConfirmDialog = props => {

  const _handleClose = () => {
    props.onOpenStateChange(false);
  };

  const actions = [
    <FlatButton key="dialog-cancel" label="Cancel" primary={true} onTouchTap={_handleClose}/>,
    <FlatButton key="dialog-submit" label="Submit" primary={true} keyboardFocused={true} onTouchTap={props.onSubmit} />
  ];

  return (
    <Dialog title={props.title} actions={actions} modal={false} open={props.isOpenState} onRequestClose={_handleClose}>
      {props.bodyText}
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  onOpenStateChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isOpenState: PropTypes.bool.isRequired,
  bodyText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default ConfirmDialog;
