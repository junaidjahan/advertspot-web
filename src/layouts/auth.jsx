import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Outlet } from 'react-router-dom';
import { Navbar } from '~/components';

export const AuthLayout = () => {
  return (
    <div>
      <Navbar />
      <Grid
        container
        alignItems='stretch'
        direction='row'
        justifyContent='center'
        sx={{ height: '100%', position: 'absolute' }}
      >
        <Grid sx={{ bgcolor: 'primary.main' }} item xs={12} md={6}>
          <Box>
            <img width='90%' height='90%' src='/freelancer.png' alt='' />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Outlet />
        </Grid>
      </Grid>
    </div>
  );
};
