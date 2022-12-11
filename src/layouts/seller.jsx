import { Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Navbar, SellerNavbar } from '~/components';
import { userState } from '~/state';

export const SellerLayout = () => {
  const [user, setUser] = useRecoilState(userState);
  return (
    <div>
      {user.userTypes?.includes('seller') ? <SellerNavbar /> : <Navbar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};
