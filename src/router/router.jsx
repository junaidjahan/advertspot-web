import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { useRecoilState, useRecoilValue } from 'recoil';

import { AuthRoute, PrivateRoute } from '~/components';
import Messages from '~/components/shared/message';
import { AuthLayout, BuyerLayout, SellerLayout } from '~/layouts';

import {
  AllJobs,
  About,
  BuyerDashboard,
  CreateGig,
  Home,
  JobDetails,
  Login,
  PostJob,
  SellerDashboard,
  Signup,
  GigDetails,
  ProposalDetails,
  GetSellerGigs,
  Payment,
  Order
} from '~/pages';
import { CreateProposal } from '~/pages/seller/proposal/create-proposal';

import { ContactUs } from '~/pages/contactus';
import { authState, userState } from '~/state';
import { AllProposals } from '~/pages/buyer/proposal/all-proposals';

export const Router = () => {
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();

  const [user, setUser] = useRecoilState(userState);

  const handleAuth = async () => {
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
        <Route path='contact-us' element={<ContactUs />} />
        <Route path='about' element={<About />} />
        <Route path='buyer/*' element={<BuyerLayout />}>
          <Route path='dashboard' element={<BuyerDashboard />} />
          <Route path='post-job' element={<PostJob />} />
          <Route path='proposals/:id' element={<AllProposals />} />
          <Route path='messages/:id' element={<Messages />} />
          <Route path='messages' element={<Messages />} />
          <Route path='proposals/proposal-details/:id' element={<ProposalDetails />} />
          <Route path='payment/:id' element={<Payment />} />
          <Route path='orders' element={<Order />} />
        </Route>
        <Route path='seller/*' element={<SellerLayout />}>
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='view-job-details/:id' element={<JobDetails />} />
          <Route path='dashboard' element={<SellerDashboard />} />
          <Route path='creategig' element={<CreateGig />} />
          <Route path='gig/get-by-id/:id' element={<GigDetails />} />
          <Route path='gig/get-by-seller-id/:id' element={<GetSellerGigs />} />
          <Route path='messages/:id' element={<Messages />} />
          <Route path='messages' element={<Messages />} />
          <Route path='submit-proposal/:id' element={<CreateProposal />} />
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
