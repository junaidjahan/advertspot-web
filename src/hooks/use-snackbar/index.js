import { useRecoilState } from 'recoil';
import { snackbarState } from '~/state';

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);

  /**
   * @param {string} message
   * @param {'success'|'error'|'info'|'warning'} color
   * @param {number} autoHideDuration
   */
  const open = (message, color = 'success', autoHideDuration = 5000) => {
    setSnackbar({
      open: true,
      message,
      autoHideDuration,
      color
    });
  };

  const close = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  return {
    snackbar,
    open,
    close
  };
};
