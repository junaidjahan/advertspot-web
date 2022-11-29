import { Box, Container, Icon, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { BaseButton, BaseCard } from '~/components';
import { userState } from '~/state';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const SellerDashboard = () => {
  const [user, setUser] = useRecoilState(userState);
  const [IsAOExpanded, setIsAOExpanded] = useState(false);
  const [IsCOExpanded, setIsCOExpanded] = useState(false);
  const [IsCAExpanded, setIsCAExpanded] = useState(false);
  const navigate = useNavigate();

  const jobs = [
    {
      title: 'Flex Designer',
      budget: '10,000 Pkr',
      proposals: 10,
      hired: 1,
      status: 'In-Progress'
    },
    {
      title: 'Banner Designer',
      budget: '10,000 Pkr',
      proposals: 10,
      hired: 1,
      status: 'In-Progress'
    },
    {
      title: 'Poster Designer',
      budget: '10,000 Pkr',
      proposals: 10,
      hired: 1,
      status: 'In-Progress'
    }
  ];

  const workDetails = [
    {
      title: 'Get Noticed',
      imgSrc: '/sellernotice.png',
      description:
        'Provide enough detail for great talent to figure out if the work is right for them.(You can always edit your post, or send an invite to reach out to people directly.)'
    },
    {
      title: 'Get more skills & exposure',
      imgSrc: '/sellerexp.png',
      description:
        'A strong working relationship starts with open communication. Here’s your chance to ask about experience, set expectations for what you need, and discuss terms of the work.'
    },
    {
      title: 'Become a successful seller',
      imgSrc: '/sellerrating.png',
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
              variant='outlined'
              onClick={() => {
                navigate('/home');
              }}
            >
              Browse Catalog
            </BaseButton>
            <BaseButton
              onClick={() => {
                navigate('/seller/creategig', { replace: true });
              }}
              className='ml-10'
              variant='contained'
            >
              Create A New Gig
            </BaseButton>
          </Box>
        </Box>
        <Box sx={{ marginY: 2 }}>
          <Accordion
            elevation='0'
            sx={{ borderRadius: 4, borderColor: 'rgba(0, 0, 0, 0.12)', borderStyle: 'solid', borderWidth: '1px' }}
            square
            expanded={IsAOExpanded}
            onChange={() => setIsAOExpanded(!IsAOExpanded)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel4bh-content' id='panel4bh-header'>
              <Typography sx={{ width: '33%', flexShrink: 0 }}>Active Orders</Typography>
            </AccordionSummary>

            {jobs.map((job, index) => {
              return (
                <AccordionDetails>
                  <Box key={index} sx={style.list}>
                    <Box className='d-flex justify-space-between'>
                      <Box>
                        <h4 style={style.jobTitle}>{job.title}</h4>
                      </Box>
                      <Box>
                        <Icon sx={style.icon}>delete</Icon>
                      </Box>
                    </Box>
                    <Box className='d-flex justify-space-between'>
                      <Box>
                        <p style={style.budget} className='d-flex'>
                          Budget: {job.budget}
                        </p>
                      </Box>
                      <Box className='d-flex'>
                        <h5 style={style.subHeading}>
                          Proposals:
                          <span style={style.details}> {job.proposals}</span>
                        </h5>
                        <h5 className='ml-7' style={style.subHeading}>
                          Hired:<span style={style.details}> {job.hired}</span>
                        </h5>
                        <h5 className='ml-7' style={style.subHeading}>
                          Status:<span style={style.details}> {job.status}</span>
                        </h5>
                      </Box>
                    </Box>
                  </Box>
                </AccordionDetails>
              );
            })}
          </Accordion>
        </Box>
        <Box sx={{ marginY: 2 }}>
          <Accordion
            elevation='0'
            sx={{ borderRadius: 4, borderColor: 'rgba(0, 0, 0, 0.12)', borderStyle: 'solid', borderWidth: '1px' }}
            square
            expanded={IsCOExpanded}
            onChange={() => setIsCOExpanded(!IsCOExpanded)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel4bh-content' id='panel4bh-header'>
              <Typography sx={{ width: '33%', flexShrink: 0 }}>Completed Orders</Typography>
            </AccordionSummary>

            {jobs.map((job, index) => {
              return (
                <AccordionDetails>
                  <Box key={index} sx={style.list}>
                    <Box className='d-flex justify-space-between'>
                      <Box>
                        <h4 style={style.jobTitle}>{job.title}</h4>
                      </Box>
                      <Box>
                        <Icon sx={style.icon}>delete</Icon>
                      </Box>
                    </Box>
                    <Box className='d-flex justify-space-between'>
                      <Box>
                        <p style={style.budget} className='d-flex'>
                          Budget: {job.budget}
                        </p>
                      </Box>
                      <Box className='d-flex'>
                        <h5 style={style.subHeading}>
                          Proposals:
                          <span style={style.details}> {job.proposals}</span>
                        </h5>
                        <h5 className='ml-7' style={style.subHeading}>
                          Hired:<span style={style.details}> {job.hired}</span>
                        </h5>
                        <h5 className='ml-7' style={style.subHeading}>
                          Status:<span style={style.details}> {job.status}</span>
                        </h5>
                      </Box>
                    </Box>
                  </Box>
                </AccordionDetails>
              );
            })}
          </Accordion>
        </Box>
        <Box sx={{ marginY: 2 }}>
          <Accordion
            elevation='0'
            sx={{ borderRadius: 4, borderColor: 'rgba(0, 0, 0, 0.12)', borderStyle: 'solid', borderWidth: '1px' }}
            square
            expanded={IsCAExpanded}
            onChange={() => setIsCAExpanded(!IsCAExpanded)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel4bh-content' id='panel4bh-header'>
              <Typography sx={{ width: '33%', flexShrink: 0 }}>Cancel Orders</Typography>
            </AccordionSummary>

            {jobs.map((job, index) => {
              return (
                <AccordionDetails>
                  <Box key={index} sx={style.list}>
                    <Box className='d-flex justify-space-between'>
                      <Box>
                        <h4 style={style.jobTitle}>{job.title}</h4>
                      </Box>
                      <Box>
                        <Icon sx={style.icon}>delete</Icon>
                      </Box>
                    </Box>
                    <Box className='d-flex justify-space-between'>
                      <Box>
                        <p style={style.budget} className='d-flex'>
                          Budget: {job.budget}
                        </p>
                      </Box>
                      <Box className='d-flex'>
                        <h5 style={style.subHeading}>
                          Proposals:
                          <span style={style.details}> {job.proposals}</span>
                        </h5>
                        <h5 className='ml-7' style={style.subHeading}>
                          Hired:<span style={style.details}> {job.hired}</span>
                        </h5>
                        <h5 className='ml-7' style={style.subHeading}>
                          Status:<span style={style.details}> {job.status}</span>
                        </h5>
                      </Box>
                    </Box>
                  </Box>
                </AccordionDetails>
              );
            })}
          </Accordion>
        </Box>
        <BaseCard sx={style.card}>
          <Box className='pl-20 mb-20'>
            <h3 style={style.heading}>3 steps to become a top seller on Fiverr</h3>
            <p>
              The key to your success on Fiverr is the brand you build for yourself through your Fiverr reputation. We
              gathered some tips and resources to help you become a leading seller on Fiverr.
            </p>
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

  budget: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'grey'
  },
  subHeading: {
    fontWeight: '400'
  },
  details: {
    fontWeight: '600'
  },
  icon: {
    color: 'darkGrey.light'
  },
  list: {
    p: 2,
    borderRadius: 2,

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
