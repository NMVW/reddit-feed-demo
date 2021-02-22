import React, { useState, SyntheticEvent, MouseEvent } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

export default function SimpleSnackbar(props: { message: string, stickMs: number, reset: () => void }) {
  const [open, setOpen] = useState(true);

  const handleClose = (event: SyntheticEvent | MouseEvent, reason?: string) => {
    setOpen(false);
    props.reset();
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={props.stickMs}
        onClose={handleClose}
        message={props.message}
      />
    </div>
  );
}