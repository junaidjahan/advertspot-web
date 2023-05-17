import { AppBar, Box, Container, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { BaseButton, BaseMenu } from '~/components';
import { authState } from '~/state';

export const BuyerNavbar = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();
  const jobs = [
    {
      text: 'My Jobs',
      method: () => {
        navigate('/buyer/dashboard');
      }
    },

    {
      text: 'Post a Job',
      method: () => {
        navigate('/buyer/post-job');
      }
    }
  ];
  const browse = [
    {
      text: 'Project Catalogs',
      method: () => {
        navigate('/home');
      }
    }
  ];
  const notifications = [
    {
      text: 'Notifications will be displayed here'
    }
  ];
  const account = [
    {
      text: 'Dashboard',
      icon: 'dashboard',
      method: () => {
        navigate('/buyer/dashboard');
      }
    },
    {
      text: 'Orders',
      icon: 'list_alt',
      method: () => {
        navigate('/buyer/orders');
      }
    },
    {
      text: 'Analytics',
      icon: 'bar_chart_4_bars',
      method: () => {
        navigate('/buyer/analytics');
      }
    },
    {
      text: 'Logout',
      icon: 'logout',
      method: logout
    }
  ];

  function logout() {
    localStorage.removeItem('auth');
    setAuth(null);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={style.appBar} color='white' position='static' className='light-shadow'>
        <Toolbar variant='dense'>
          <Container maxWidth='lg' sx={style.container}>
            <Box sx={style.itemsBox}>
              <img src='/logo.png' width={50} style={style.image} />
              <BaseMenu menuItems={jobs} buttonText='Jobs' />
              <BaseMenu menuItems={browse} buttonText='Browse' />
              <BaseButton
                size='small'
                onClick={() => navigate('/buyer/messages', { replace: true })}
                color='black'
                sx={style.messages}
              >
                Messages
              </BaseButton>
            </Box>
            <Box sx={style.itemsBox}>
              {/* <BaseTextField label='Search' /> */}
              <BaseMenu menuItems={notifications} anchorPosition='right' icon='notifications' />
              <BaseMenu menuItems={account} anchorPosition='right' icon='account_circle' />
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const style = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemsBox: { display: 'flex' },
  messages: {
    fontWeight: 'bold',
    px: 1.5,
    '&:hover': { color: 'primary.main' }
  },
  image: {
    marginRight: '2rem'
  },
  appBar: {
    py: 0.5
  }
};
