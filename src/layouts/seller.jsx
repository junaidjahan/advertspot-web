import { Outlet } from 'react-router-dom';
import { Navbar } from '~/components';

export const SellerLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
