import { Box, Container, Grid, Icon, Typography, InputAdornment } from '@mui/material';
import { BackPage, BaseButton, BaseCard, BaseForm, BaseSelect, BaseTextField } from '~/components';
import { useForm, useJob, useProposal, useSnackbar } from '~/hooks';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoader } from '~/hooks/use-loader';
import { toTitleCase } from '~/global';
import { proposalSchema } from '~/schemas/proposal';
import { userState } from '~/state';
import { useRecoilState } from 'recoil';

export const CreateProposal = () => {
  const { openLoader, closeLoader } = useLoader();
  let { id } = useParams();
  const form = useForm({ schema: proposalSchema });
  const { open } = useSnackbar();
  const { saveProposal } = useProposal();
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const {
    formState: { isValid, isSubmitting },
    reset
  } = form;
  const [job, setJob] = useState();

  const { getById } = useJob();
  const getJobById = () => {
    openLoader();
    getById(id)
      .then(res => {
        setJob(res);
      })
      .finally(() => {
        closeLoader();
      });
  };

  useEffect(() => {
    getJobById();
  }, [id]);

  const handleSubmit = async values => {
    const data = { ...values };
    data.JobId = id;
    data.UserId = user?.id;
    await saveProposal(data)
      .then(() => {
        reset();
        navigate('/seller/all-jobs');
      })
      .catch(res => {
        open(res, 'error');
      });
  };

  return (
    <div>
      <Container maxWidth='md' sx={style.container}>
        <Box className='mb-10'>
          <BackPage />
        </Box>
        {job ? (
          <BaseCard>
            <h1>Proposal</h1>
            <BaseForm form={form} onSubmit={handleSubmit} className='mt-20'>
              <BaseCard sx={style.jobContainer}>
                <Box className='d-flex align-center justify-center'>
                  <h3 style={style.jobDescription}>Job Descripton</h3>
                </Box>
                <hr />
                <Grid container spacing={2}>
                  <Grid item md={8} xs={12}>
                    <h2 style={style.title}>{job?.Title}</h2>
                    <Box className='d-flex mt-5'>
                      <Icon sx={style.icon}>sell</Icon> <p style={style.budget}> {job?.Budget} Pkr</p>
                    </Box>
                    <Box className='mt-15'>
                      <p>{job?.Description}</p>
                    </Box>
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Box>
                      <Typography variant='p' className='header-message d-flex'>
                        <Typography variant='p' sx={style.dimesions}>
                          Dimensions:
                        </Typography>{' '}
                        {job?.Dimensions}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant='p' className='header-message d-flex'>
                        <Typography variant='p' sx={style.dimesions}>
                          Quantity:
                        </Typography>{' '}
                        {job?.Quantity}
                      </Typography>
                    </Box>
                    <Box>
                      <Box>
                        <p style={style.type}>{toTitleCase(job?.Type ?? '')}</p>
                        <Box className='d-flex  pl-4'>
                          <Icon sx={style.icon}>location_on</Icon> <p style={style.locationTitle}> {job?.Location}</p>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={12} md={6}></Grid>
                  <Grid item xs={12} md={6}></Grid>
                </Grid>
              </BaseCard>
              <Grid container spacing={2}>
                <Box className='mt-30'>
                  <Typography variant='p' sx={style.terms} className='header-message'>
                    What is the rate you'd like to bid this job for?
                  </Typography>
                </Box>
                <Grid item md={12}>
                  <Box>
                    <BaseTextField
                      type='number'
                      InputProps={{
                        endAdornment: <InputAdornment position='start'>Pkr</InputAdornment>
                      }}
                      fullWidth
                      required
                      label='Amount'
                      name='Amount'
                    />
                  </Box>
                </Grid>
                <Grid item md={12}>
                  <Box sx={style.textField}>
                    <BaseTextField rows={4} multiline fullWidth label='Cover Letter' name='CoverLetter' />
                  </Box>
                </Grid>

                <Grid item md={12}>
                  <Box sx={style.button}>
                    <BaseButton
                      variant='contained'
                      disabled={!isValid}
                      loading={isSubmitting}
                      size='small'
                      type='submit'
                    >
                      Submit
                    </BaseButton>
                  </Box>
                </Grid>
              </Grid>
            </BaseForm>
          </BaseCard>
        ) : (
          <Box className='center-row'>
            {' '}
            <img src='/no-data.png' width={500} />{' '}
          </Box>
        )}
      </Container>
    </div>
  );
};

const style = {
  container: {
    py: 3
  },
  lightWeight: {
    fontWeight: '600'
  },
  textField: {
    my: '10px'
  },
  button: {
    display: 'flex',
    justifyContent: 'end'
  },
  form: {
    mb: 4
  },
  jobContainer: {
    backgroundColor: 'lightGrey.main'
  },
  title: {
    fontWeight: '500'
  },
  type: {
    fontWeight: '600',
    paddingLeft: 9
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
    mx: 1
  },
  jobDescription: {
    fontWeight: '500'
  },
  terms: {
    color: 'grey.main',
    mx: 2
  }
};
