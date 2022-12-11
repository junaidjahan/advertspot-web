import { Box, Container, Grid, Icon, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { BackPage, BaseButton } from '~/components';
import { toTitleCase } from '~/global';
import { useJob, useSnackbar } from '~/hooks';
import { useLoader } from '~/hooks/use-loader';
import { userState } from '~/state';

export const JobDetails = ({ jobId }) => {
  let { id } = useParams();
  const { getById } = useJob();
  const [job, setJob] = useState();
  const { openLoader, closeLoader } = useLoader();
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  const getJobById = () => {
    openLoader();
    getById(jobId ? jobId : id)
      .then(res => {
        setJob(res);
      })
      .finally(() => {
        closeLoader();
      });
  };

  const SubmitProposal = () => {
    navigate(`/seller/submit-proposal/${id}`);
  };

  useEffect(() => {
    getJobById();
  }, [jobId ? jobId : id]);

  return (
    <Container maxWidth='md'>
      {!jobId ? (
        <Box>
          <Box className='mt-25'>
            <BackPage></BackPage>
          </Box>
          <Box className='mt-15'>
            <h2>Job Details</h2>
          </Box>
        </Box>
      ) : (
        <></>
      )}

      {job ? (
        <Container maxWidth='md' sx={style.jobContainer}>
          <h2 style={style.title}>{job?.Title}</h2>
          <Box className='mt-30'>
            <p style={style.type}>{toTitleCase(job?.Type ?? '')}</p>
            <Box className='d-flex mt-5'>
              <Icon sx={style.icon}>location_on</Icon> <p style={style.locationTitle}> {job?.Location}</p>
            </Box>
          </Box>
          <hr style={style.hr} />
          <Box>
            <p>{job?.Description}</p>
          </Box>
          <hr style={style.hr} />
          <Box className='d-flex mt-5'>
            <Icon sx={style.icon}>sell</Icon> <p style={style.budget}> {job?.Budget} Rs.</p>
          </Box>
          <hr style={style.hr} />
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography variant='p' className='header-message d-flex'>
                <Typography variant='p' sx={style.dimesions}>
                  Dimensions:
                </Typography>{' '}
                {job?.Dimensions}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant='p' className='header-message d-flex'>
                <Typography variant='p' sx={style.dimesions}>
                  Quantity:
                </Typography>{' '}
                {job?.Quantity}
              </Typography>
            </Grid>
          </Grid>
          <hr style={style.hr} />
          <Box>
            <Typography variant='p' sx={style.dimesions}>
              Activity on this job:
            </Typography>
            <Box className='d-flex'>
              <Typography variant='p' sx={style.proposals}>
                Proposals:
              </Typography>
              <Typography variant='p' className='ml-6'>
                {job?.Proposals}
              </Typography>
            </Box>
          </Box>

          {user?.userTypes?.includes('seller') ? (
            <Box className='d-flex align-center justify-center mt-40'>
              <BaseButton
                onClick={() => {
                  SubmitProposal();
                }}
                variant='contained'
                disableElevation
              >
                Submit Proposal
              </BaseButton>
            </Box>
          ) : (
            <></>
          )}
        </Container>
      ) : (
        <Box className='center-row'>
          {' '}
          <img src='/no-data.png' width={500} />{' '}
        </Box>
      )}
    </Container>
  );
};

const style = {
  jobContainer: {
    border: '1px solid #dfdfdf',
    p: 2,
    my: 4,
    borderRadius: 5
  },
  title: {
    fontWeight: '500'
  },
  type: {
    color: '#9B57F2',
    fontWeight: '500',
    paddingLeft: 7
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
