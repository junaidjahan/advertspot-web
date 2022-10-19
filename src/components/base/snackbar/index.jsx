import { Alert, Snackbar } from '@mui/material';
import { useSnackbar } from '~/hooks';

export const BaseSnackbar = () => {
  const {
    snackbar: { color, open, autoHideDuration, message },
    close
  } = useSnackbar();

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={close}
    >
      <Alert onClose={close} severity={color}>
        {message}
      </Alert>
    </Snackbar>
  );
};
