import { Outlet } from 'react-router-dom';
import { BuyerNavbar } from '~/components';

export const BuyerLayout = () => {
  return (
    <>
      <BuyerNavbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};
