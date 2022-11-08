import { ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BaseSnackbar, Loader } from './components';
import { isEmpty } from './global';
import { useAxios } from './hooks';
import { Router } from './router';
import { authState, userState } from './state';
import { theme } from './styles/theme';

export const App = () => {
  const { get } = useAxios();

  const auth = useRecoilValue(authState);
  const [user, setUser] = useRecoilState(userState);

  const handleAuth = async () => {
    auth ? localStorage.setItem('auth', JSON.stringify(auth)) : localStorage.removeItem('auth');

    if (auth && isEmpty(user)) {
      try {
        setUser(await get('/auth/profile'));
      } catch {}
    } else if (!auth) {
      setUser({});
    }
  };

  useEffect(() => {
    handleAuth();
  }, [auth]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Loader />
        <BaseSnackbar />
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  );
};
