import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authState, userState } from '~/state';
import { useAxios } from '../use-axios';

export const useAuth = () => {
  const { post, get } = useAxios();
  const navigate = useNavigate();

  const setAuth = useSetRecoilState(authState);
  const user = useRecoilValue(userState);

  const saveAuth = authData => {
    setAuth(authData);
    // navigate(authData ? '/buyer/dashboard' : '/auth/login', { replace: true });
  };

  const login = async data => {
    try {
      saveAuth(await post('/auth/login', data));
    } catch {}
  };

  const signup = async data => {

    return await post('/auth/signup', data);

  };

  const updateUser = async (data) => {
    try {
      await post('/auth/update-profile', data);
    } catch {}
  };

  const logout = async () => {
    try {
      await post('/auth/logout').catch();
      saveAuth(null);
    } catch {}
  };

  return {
    login,
    signup,
    logout,
    user,
    updateUser
  };
};
