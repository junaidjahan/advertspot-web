import { atom } from 'recoil';

export const authState = atom({
  key: 'auth',
  default: JSON.parse(localStorage.getItem('auth') ?? 'null')
});

export const userState = atom({
  key: 'user',
  default: {}
});
