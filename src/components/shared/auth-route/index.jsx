import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '~/state';

export const AuthRoute = ({ redirectPath = '/' }) => {
  const auth = useRecoilValue(authState);

  return !auth ? <Outlet /> : <Navigate to={redirectPath} />;
};
