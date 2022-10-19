import { atom } from 'recoil';

export const snackbarState = atom({
  key: 'snackbar',
  default: () => ({
    open: false,
    autoHideDuration: 5000,
    message: '',
    color: 'success'
  })
});
