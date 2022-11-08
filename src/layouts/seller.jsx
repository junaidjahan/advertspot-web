import { Outlet } from 'react-router-dom';
import { Navbar } from '~/components';
import { SellerNavbar } from '~/components';

export const SellerLayout = () => {
  return (
    <div>
      <SellerNavbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
