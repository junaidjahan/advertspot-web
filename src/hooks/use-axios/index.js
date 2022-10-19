import axios from 'axios';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { serializeQuery } from '~/global';
import { authState } from '~/state';
import { useSnackbar } from '../use-snackbar';

const apiBaseUrl = import.meta.env.REACT_API_URL;

axios.defaults.baseURL = apiBaseUrl;

export const useAxios = () => {
  const [auth, setAuth] = useRecoilState(authState);

  const { open } = useSnackbar();

  const logout = () => {
    setAuth(null);
    navigate('/auth/login', { replace: true });
  };

  useEffect(() => {
    axios.interceptors.response.use(undefined, async err => {
      const config = err.config;
      if (
        config.url !== '/auth/login' &&
        config.url !== '/auth/refresh-access-token' &&
        err.response &&
        auth &&
        err.response.status === 401
      ) {
        try {
          delete config.headers?.['authorization'];
          const { data } = await axios.post('/auth/refresh-access-token', {
            refreshToken: auth.refreshToken
          });
          setAuth(data);
          config.headers = config.headers ?? {};
          config.headers.authorization = `Bearer ${data.accessToken}`;
          return axios(config);
        } catch (e) {
          logout();
          return axios(config);
        }
      }
      return Promise.reject(err);
    });
  }, []);

  const request = method => {
    return async (url, body, config, options) => {
      const requestConfig = {
        ...config,
        method,
        headers: authHeader()
      };
      if (body) {
        requestConfig.headers['Content-Type'] = 'application/json';
        requestConfig.data = body;
      }

      const requestUrl = `${url}${options?.filter ? `?${serializeQuery(options.filter)}` : ''}`;

      try {
        const response = await axios(requestUrl, requestConfig);
        return handleResponse(response);
      } catch (e) {
        return handleResponse(e, options?.showErrorToast);
      }
    };
  };

  const authHeader = () => {
    if (auth?.accessToken) {
      return { authorization: `Bearer ${auth.accessToken}` };
    } else {
      return {};
    }
  };

  const handleResponse = (response, showErrorToast = true) => {
    if ('data' in response) {
      return response.data;
    } else {
      if ([401, 403].includes(+response.status) && auth?.accessToken) {
        logout();
      }
      const error = response.response?.data ?? 'Something went wrong.';
      const errorMessage = typeof error === 'object' ? error?.message : error;

      if (showErrorToast) {
        open(errorMessage, 'error');
      }

      return Promise.reject(errorMessage);
    }
  };

  return {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    patch: request('PATCH'),
    del: request('DELETE')
  };
};
