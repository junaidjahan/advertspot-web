import { Avatar, Box, Container, Grid, Icon, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BackPage, BaseButton } from '~/components';
import { toTitleCase } from '~/global';
import { useGig, useJob, useSnackbar } from '~/hooks';
import { useLoader } from '~/hooks/use-loader';
import 'swiper/css';
import 'swiper/css/navigation';

import './swipeStyle.css';

export const GigDetails = () => {
  let { id } = useParams();
  const [gig, setGig] = useState({ gig: {}, user: {} });
  const { openLoader, closeLoader } = useLoader();
  const navigate = useNavigate();
  const { getGigById } = useGig();

  const getById = () => {
    openLoader();
    getGigById(id)
      .then(res => {
        console.log(res);
        setGig(res);
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
      <Box className='mt-25'>
        <BackPage></BackPage>
      </Box>

      {gig ? (
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
                  {gig.user?.firstName} {gig.user?.lastName}
                </h2>
                <BaseButton onClick={() => navigate("/seller/messages", { replace: true })} variant='outlined' className='mt-10'>
                  {' '}
                  Message
                </BaseButton>
              </Box>
            </Container>
          </Grid>
          <Grid item xs={12} md={8}>
            <Container maxWidth='md' sx={style.jobContainer}>
              <Box className='mt-5'>
                <h2>Gig Details</h2>
              </Box>
              <Swiper navigation={true} modules={[Navigation]} className='mySwiper mt-10'>
                {gig.gig?.images?.map((g, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <img src={g} alt='' />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <Box className='mt-20'>
                <h2 style={style.title}>{gig.gig?.title}</h2>
              </Box>
              <Box className='p-0'>
                <p style={style.type}>{toTitleCase(gig.gig?.category ?? '')}</p>
              </Box>
              <hr style={style.hr} />
              <Box>
                <p>{gig.gig?.description}</p>
              </Box>
              <hr style={style.hr} />
              <Box className='d-flex mt-5'>
                <Icon sx={style.icon}>sell</Icon> <p style={style.budget}> {gig.gig?.price} Rs.</p>
              </Box>
              <hr style={style.hr} />
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Typography variant='p' className='header-message d-flex'>
                    <Typography variant='p' sx={style.dimesions}>
                      Dimensions:
                    </Typography>{' '}
                    {gig.gig?.dimensions}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='p' className='header-message d-flex'>
                    <Typography variant='p' sx={style.dimesions}>
                      Quantity:
                    </Typography>{' '}
                    {gig.gig?.quantity}
                  </Typography>
                </Grid>
              </Grid>
              <hr style={style.hr} />

              <Box className='d-flex align-center justify-center mt-40'>
                <BaseButton
                  onClick={() => {
                    SubmitProposal();
                  }}
                  variant='contained'
                  disableElevation
                >
                  Place Order
                </BaseButton>
              </Box>
            </Container>
          </Grid>
        </Grid>
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
