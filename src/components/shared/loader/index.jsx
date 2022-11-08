import { Backdrop, CircularProgress } from '@mui/material';
import { useLoader } from '~/hooks/use-loader';

export const Loader = () => {
  const {
    loader: { open },
    closeLoader
  } = useLoader();
  const handleClose = () => {
    closeLoader();
  };

  return (
    <>
      <Backdrop sx={{ color: '#fffff', zIndex: theme => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose}>
        <CircularProgress color='white' />
      </Backdrop>
    </>
  );
};
