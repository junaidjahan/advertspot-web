import Stack from '@mui/material/Stack';
import { IntroCard } from './IntroCard';

export const CardWrapper = () => {
  return (
    <div style={{ marginTop: 5 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
        <IntroCard />
      </Stack>
    </div>
  );
};
