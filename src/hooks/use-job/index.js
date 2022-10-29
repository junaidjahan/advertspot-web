import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authState, userState } from '~/state';
import { useAxios } from '../use-axios';

export const useJob = () => {
  const { post } = useAxios();
  const navigate = useNavigate();

  const setAuth = useSetRecoilState(authState);
  const user = useRecoilValue(userState);

  const saveJob = async jobData => {
    {
      try {
        (jobData.Quantity = parseInt(jobData.Quantity)), (jobData.Budget = parseInt(jobData.Budget));
        await post('/job', jobData);
      } catch {}
    }
  };

  //   const saveAuth = authData => {
  //     setAuth(authData);
  //     navigate(authData ? '/' : '/auth/login', { replace: true });
  //   };

  //   const login = async data => {
  //     try {
  //       saveAuth(await post('/auth/login', data));
  //     } catch {}
  //   };

  //   const signup = async data => {
  //     try {
  //       saveAuth(await post('/auth/signup', data));
  //     } catch {}
  //   };

  //   const logout = async () => {
  //     try {
  //       await post('/auth/logout').catch();
  //       saveAuth(null);
  //     } catch {}
  //   };

  return {
    saveJob
  };
};
