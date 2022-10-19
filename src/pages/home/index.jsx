import { Grid } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { CardWrapper } from '~/components';
import { userState } from '~/state';

export const Home = () => {
  const user = useRecoilValue(userState);

  return (
    <div>
      <Grid height={'30%'} container spacing={2}>
        <Grid item xs={4}>
          <CardWrapper />
        </Grid>
        <Grid item xs={8}>
          <div>Hello {user.firstName}</div>
        </Grid>
      </Grid>
    </div>
  );
};
