import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoute, PrivateRoute } from '~/components';
import Messages from '~/components/shared/message';
import { AuthLayout, BuyerLayout, SellerLayout } from '~/layouts';
import { BuyerDashboard, CreateGig, Home, Jobs, Login, PostJob, SellerDashboard, Signup } from '~/pages';

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
        <Route path='seller/*' element={<SellerLayout />}>
          <Route path='dashboard' element={<SellerDashboard />} />
          <Route path='jobs' element={<Jobs />} />
          <Route path='creategig' element={<CreateGig />} />
          <Route path='messages' element={<Messages />} />
        </Route>
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
