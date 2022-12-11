import { Avatar, Box, Container, Grid, Icon, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BackPage, BaseButton, BaseCard } from '~/components';
import { useProposal } from '~/hooks';
import { useLoader } from '~/hooks/use-loader';
import { JobDetails } from '../..';

export const ProposalDetails = () => {
  let { id } = useParams();
  const { getProposalById } = useProposal();
  const [proposal, setProposal] = useState({});
  const { openLoader, closeLoader } = useLoader();

  const getById = () => {
    openLoader();
    getProposalById(id)
      .then(res => {
        console.log(res);
        setProposal(res);
      })
      .finally(() => {
        closeLoader();
      });
  };

  useEffect(() => {
    getById(id);
  }, [id]);

  return (
    <Container maxWidth='lg'>
      <Box className='mt-20'>
        <BackPage />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Container maxWidth='md' sx={style.jobContainer}>
            <Box>
              <h2 style={{ fontWeight: '500', fontSize: 18 }}>About The Seller</h2>
            </Box>
            <Box
              className='d-flex  mt-15'
              sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            >
              <Avatar alt='Remy Sharp' src='/avatar2.png' sx={{ width: 120, height: 120 }} />
              <h2 style={{ fontWeight: '500', fontSize: 18, color: 'grey' }}>
                {proposal.user?.firstName} {proposal.user?.lastName}
              </h2>
              <BaseButton variant='outlined' className='mt-10'>
                {' '}
                Message
              </BaseButton>
            </Box>
            <Box className='mt-10'>
              <Typography variant='h2' sx={{ fontWeight: '500', fontSize: 18, display: 'flex', alignItems: 'center' }}>
                Seller Offer:
                <Typography variant='h2' sx={{ fontWeight: '500', fontSize: 18, color: 'primary.main', ml: 1 }}>
                  {proposal.proposal?.Amount}
                </Typography>
              </Typography>
            </Box>
            <Box className='mt-10'>
              <Typography variant='h2' sx={{ fontWeight: '500', fontSize: 18 }}>
                Cover Letter:
              </Typography>
              <BaseCard sx={{ mt: 2, backgroundColor: 'lightGrey.main' }}>{proposal.proposal?.CoverLetter}</BaseCard>
            </Box>
            <Box className='mt-20' sx={style.center}>
              <BaseButton variant='contained' size='small'>
                Place Order
              </BaseButton>
            </Box>
          </Container>
        </Grid>
        <Grid item xs={12} md={8}>
          {proposal.job?._id ? <JobDetails jobId={proposal.job?._id} /> : <></>}
        </Grid>
      </Grid>
    </Container>
  );
};

const style = {
  jobContainer: {
    border: 1,
    p: 2,
    my: 4,
    borderRadius: 5
  },
  title: {
    fontWeight: '500'
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  type: {
    color: '#9B57F2',
    fontWeight: '500'
  },
  locationTitle: {
    fontSize: 15
  },
  icon: {
    color: '#9B57F2'
  },
  hr: {
    marginTop: 20,
    marginBottom: 20
  },
  budget: {
    marginLeft: 5
  },
  dimesions: {
    fontWeight: '600',
    mr: 2
  },
  proposals: {
    color: 'darkGrey.main'
  }
};
