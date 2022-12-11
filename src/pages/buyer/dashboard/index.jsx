import { Box, Container, Grid, Icon } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BaseButton, BaseCard } from '~/components';
import { toTitleCase } from '~/global';
import { useJob } from '~/hooks';
import { useLoader } from '~/hooks/use-loader';
import { authState, userState } from '~/state';

export const BuyerDashboard = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  const auth = useRecoilValue(authState);
  const { getCurrentUserJobs } = useJob();
  const [jobs, setJobs] = useState([]);
  const { openLoader, closeLoader } = useLoader();

  const getAllJobs = () => {
    openLoader();
    getCurrentUserJobs()
      .then(res => {
        setJobs(res);
      })
      .finally(() => {
        closeLoader();
      });
  };

  const getById = id => {
    navigate(`/seller/view-job-details/${id}`);
  };

  const handleAuth = async () => {
    if (user && auth) {
      const navigation = user.userTypes?.includes('seller') ? '/seller/dashboard' : '/buyer/dashboard';
      navigate(navigation, { replace: true });
    } else {
      navigate('/auth/login', { replace: true });
    }
  };

  useEffect(() => {
    handleAuth();
    getAllJobs();
  }, [user, auth]);

  const getProposal = id => {
    navigate(`/buyer/proposals/${id}`);
  };
  const workDetails = [
    {
      title: '1. Post a job to the marketplace',
      imgSrc: '/posting.png',
      description:
        'Provide enough detail for great talent to figure out if the work is right for them.(You can always edit your post, or send an invite to reach out to people directly.)'
    },
    {
      title: '2. Get proposals from talent',
      imgSrc: '/file.png',
      description:
        'A strong working relationship starts with open communication. Here’s your chance to ask about experience, set expectations for what you need, and discuss terms of the work.'
    },
    {
      title: '3. Pay for work you approve',
      imgSrc: '/cashless-payment.png',
      description:
        'Reports are useful for keeping track of payments and reviewing work. As you complete jobs, you can build trusting relationships with talent in a way that helps you both grow.'
    }
  ];

  return (
    <div>
      <Container maxWidth='md'>
        <Box className='d-flex justify-space-between mt-20 pt-40'>
          <Box>
            <h2>Your Dashboard</h2>
            <h4 style={style.userName}>
              {user.firstName} {user.lastName}
            </h4>
          </Box>
          <Box>
            <BaseButton
              onClick={() => {
                navigate('/home');
              }}
              variant='outlined'
            >
              Browse Catalog
            </BaseButton>
            <BaseButton
              onClick={() => {
                navigate('/buyer/post-job', { replace: true });
              }}
              className='ml-10'
              variant='contained'
            >
              Post a Job
            </BaseButton>
          </Box>
        </Box>
        <Box>
          <BaseCard sx={style.card}>
            <Box sx={{ px: 2 }} className='d-flex justify-space-between '>
              <h3 style={style.heading}>Your Postings</h3>
              <a style={style.anchor}>See all postings</a>
            </Box>
            {jobs?.map((job, index) => {
              return (
                <Box key={index} sx={style.list}>
                  <Box className='d-flex justify-space-between'>
                    <Box
                      sx={{ cursor: 'pointer' }}
                      onClick={() => {
                        getById(job?._id);
                      }}
                    >
                      <h4 style={style.jobTitle}>{job?.Title}</h4>
                    </Box>
                    <Box>
                      <BaseButton
                        onClick={() => {
                          getProposal(job?._id);
                        }}
                        size='small'
                        variant='outlined'
                      >
                        Proposals <Icon sx={style.paymentIcon}> visibility </Icon>
                      </BaseButton>
                    </Box>
                  </Box>
                  <Box className='d-flex mt-10 justify-space-between'>
                    <Box>
                      <p style={style.budget} className='d-flex'>
                        Budget: {job?.Budget}
                      </p>
                    </Box>
                    <Box className='d-flex'>
                      {/* <h5 style={style.subHeading}>
                        Proposals:
                        <span style={style.details}> {job?.Proposals}</span>
                      </h5>
                      <h5 className='ml-7' style={style.subHeading}>
                        Hired:<span style={style.details}> 0</span>
                      </h5> */}
                      <h5 className='ml-7' style={style.subHeading}>
                        Status:<span style={style.details}> {toTitleCase(job?.Status ?? '')}</span>
                      </h5>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </BaseCard>
        </Box>
        <BaseCard sx={style.card}>
          <Box className='pl-20 mb-20'>
            <h3 style={style.heading}>How to work with Talent</h3>
            <p>Connect with a talent community that numbers in the millions, fast and at no cost.</p>
          </Box>

          {workDetails.map((detail, index) => {
            return (
              <Box key={index}>
                <Box className='d-flex' sx={style.workDetailslist}>
                  <Box className='mr-40'>
                    <img src={detail.imgSrc} width={130} alt='' />
                  </Box>
                  <Box>
                    <h4 style={style.pointsTitle}>{detail.title}</h4>
                    <p>{detail.description}</p>
                  </Box>
                </Box>
                <hr />
              </Box>
            );
          })}
        </BaseCard>
      </Container>
    </div>
  );
};

const style = {
  userName: {
    fontWeight: 'normal'
  },

  card: {
    mt: 2
  },
  heading: {
    fontWeight: '600',
    fontSize: 21
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '500'
  },
  anchor: {
    fontWeight: '500',
    fontSize: 14,
    color: '#1f57c3'
  },

  paymentIcon: {
    fontSize: 20,
    backgroundColor: 'grey',
    ml: 1
  },

  budget: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'grey'
  },
  subHeading: {
    fontWeight: '400'
  },
  details: {
    fontWeight: '600',
    color: '#9B57F2'
  },
  icon: {
    color: 'darkGrey.light'
  },
  list: {
    p: 2,
    borderRadius: 2,
    border: `1px solid #dfdfdf`,
    mt: 1,

    '&:hover': {
      backgroundColor: 'primary.light'
    }
  },

  pointsTitle: {
    fontSize: 20,
    fontWeight: '500'
  },

  workDetailslist: {
    p: 2
  }
};
