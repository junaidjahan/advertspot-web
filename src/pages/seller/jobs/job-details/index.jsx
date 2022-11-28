import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';

export const JobDetails = () => {
  let { userId } = useParams();

  return (
    <Container maxWidth='md'>
      <h1>hello</h1>
    </Container>
  );
};
