import { atom } from 'recoil';

export const loaderState = atom({
  key: 'loader',
  default: () => ({
    open: false
  })
});
