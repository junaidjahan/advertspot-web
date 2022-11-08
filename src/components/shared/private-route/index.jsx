import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '~/state';

export const PrivateRoute = ({ redirectPath = '/auth/login', isAllowed = true }) => {
  const auth = useRecoilValue(authState);

  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  // return auth ? <Outlet /> : <Navigate to={redirectPath} />;
  return <Outlet /> ;
};
