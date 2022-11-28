import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { AuthRoute, PrivateRoute } from '~/components';
import Messages from '~/components/shared/message';
import { AuthLayout, BuyerLayout, SellerLayout } from '~/layouts';
import { AllJobs, BuyerDashboard, CreateGig, Home, JobDetails, Login, PostJob, SellerDashboard, Signup } from '~/pages';
import { authState } from '~/state';

export const Router = () => {
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();

  const handleAuth = () => {
    if (!auth) {
      navigate('/auth/login', { replace: true });
    }
  };

  useEffect(() => {
    handleAuth();
  }, [auth]);

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
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='view-job-details/:id' element={<JobDetails />} />
          <Route path='dashboard' element={<SellerDashboard />} />
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
