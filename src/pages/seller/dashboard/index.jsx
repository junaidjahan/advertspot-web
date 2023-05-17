import { Box, Container, Icon, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BaseButton, BaseCard, BaseChart, OrderCard } from '~/components';
import { authState, userState } from '~/state';
import { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useOrder } from '~/hooks';
import { useLoader } from '~/hooks/use-loader';
import { objPropsToLowerCase, setPiarChartdata } from '~/global';
import { ORDER_STATUS, USER_TYPE, pieChartoptions } from '~/global/constants';

export const SellerDashboard = () => {
  const [user, setUser] = useRecoilState(userState);
  const [chartData, setChartData] = useState([]);
  const [IsAOExpanded, setIsAOExpanded] = useState(false);
  const [IsCOExpanded, setIsCOExpanded] = useState(false);
  const [IsCAExpanded, setIsCAExpanded] = useState(false);
  const [options, setOptions] = useState(pieChartoptions);
  const { openLoader, closeLoader } = useLoader();
  const [orders, setOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const auth = useRecoilValue(authState);

  const { getAllSellerOrders, getOrderCount } = useOrder();
  const navigate = useNavigate();

  const getAllOrders = () => {
    openLoader();
    getAllSellerOrders()
      .then(res => {
        setOrders(res.filter(ord => ord.status == ORDER_STATUS.IN_PROGRESS));
        setCompletedOrders(res.filter(ord => ord.status == ORDER_STATUS.COMPLETED));
        setCancelledOrders(res.filter(ord => ord.status == ORDER_STATUS.CANCELLED));
      })
      .finally(() => {
        closeLoader();
      });
  };

  const getChartData = () => {
    openLoader();
    getOrderCount(USER_TYPE.SELLER)
      .then(res => {
        setOptions(setPiarChartdata(options, res));
      })
      .finally(() => {
        closeLoader();
      });
  };

  const handleAuth = async () => {
    if (user && auth) {
      const navigation = user.userTypes?.includes('seller') ? '/seller/dashboard' : '/buyer/dashboard';
      navigate(navigation, { replace: true });
    } else {
      navigate('/auth/login', { replace: true });
    }
  };
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

  useEffect(() => {
    handleAuth();
    getAllOrders();
    getChartData();
  }, [user, auth]);

  return (
    <div>
      <Container maxWidth='lg' className='pb-20'>
        <Grid container direction='row'>
          <Grid item xs={12} md={8}>
            <Box className='d-flex justify-space-between mt-20 pt-40'>
              <Box>
                <h2>Your Dashboard</h2>
                <h4 style={style.userName}>
                  {user.firstName} {user.lastName}
                </h4>
              </Box>
              <Box>
                <BaseButton
                  className='ml-10'
                  variant='outlined'
                  onClick={() => {
                    navigate(`/seller/gig/get-by-seller-id/${user.id}`, { replace: true });
                  }}
                >
                  My Ads
                </BaseButton>
                <BaseButton
                  onClick={() => {
                    navigate('/seller/creategig', { replace: true });
                  }}
                  className='ml-10'
                  variant='contained'
                >
                  Create A New Ad
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

                {orders.length ? (
                  orders?.map((order, index) => {
                    return (
                      <>
                        <OrderCard className='mt-15 mb-15' key={index} order={order} />
                      </>
                    );
                  })
                ) : (
                  <div className='center-row mb-10'>No data</div>
                )}
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

                {completedOrders.length ? (
                  completedOrders?.map((order, index) => {
                    return (
                      <>
                        <OrderCard className='mt-15 mb-15' key={index} order={order} />
                      </>
                    );
                  })
                ) : (
                  <div className='center-row mb-10'>No data</div>
                )}
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
                {cancelledOrders.length ? (
                  cancelledOrders?.map((order, index) => {
                    return (
                      <>
                        <OrderCard className='mt-15 mb-15' key={index} order={order} />
                      </>
                    );
                  })
                ) : (
                  <div className='center-row mb-10'>No data</div>
                )}
              </Accordion>
            </Box>
            <BaseCard sx={style.card}>
              <Box className='pl-20 mb-20'>
                <h3 style={style.heading}>3 steps to become a top seller on Fiverr</h3>
                <p>
                  The key to your success on Fiverr is the brand you build for yourself through your Fiverr reputation.
                  We gathered some tips and resources to help you become a leading seller on Fiverr.
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
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <BaseChart options={options} id='order-by-type' style={{ width: '400px', height: '400px' }} />
              <Box style={{ textAlign: 'center', marginTop: '30px' }}>
                <BaseButton
                  style={{ textAlign: 'center' }}
                  variant='outlined'
                  onClick={() => {
                    navigate('/seller/analytics');
                  }}
                >
                  View Analytics
                </BaseButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
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
