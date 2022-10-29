import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoute, PrivateRoute } from '~/components';
import { AuthLayout, BuyerLayout, SellerLayout } from '~/layouts';
import { BuyerDashboard, Home, Login, PostJob, Signup } from '~/pages';

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<PrivateRoute />}>
        <Route path='/' element={<Navigate to='buyer/dashboard' replace />} />
        <Route path='home' element={<Home />} />
        <Route path='buyer/*' element={<BuyerLayout />}>
          <Route path='dashboard' element={<BuyerDashboard />} />
          <Route path='post-job' element={<PostJob />} />
        </Route>
        <Route path='seller/*' element={<SellerLayout />} />
      </Route>

      {/* Auth Routes */}
      <Route path='/auth' element={<AuthRoute />}>
        <Route path='/auth/*' element={<AuthLayout />}>
          <Route path='auth' element={<Navigate to='/auth/login' replace />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
        </Route>
      </Route>
    </Routes>
  );
};
