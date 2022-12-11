import { Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { BuyerNavbar, Navbar } from '~/components';
import { userState } from '~/state';

export const BuyerLayout = () => {
  const [user, setUser] = useRecoilState(userState);

  return (
    <>
      {user.userTypes?.includes('buyer') ? <BuyerNavbar /> : <Navbar />}
      <main>
        <Outlet />
      </main>
    </>
  );
};
