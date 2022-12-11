import { AppBar, Box, Container, Toolbar } from '@mui/material';
import { useNavigate, useNavigation } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from '~/state';
import { BaseButton, BaseMenu } from '../../base';

export const Navbar = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authState);
  const buttons = [
    {
      text: 'Browse',
      variant: 'text',
      nvg: () => {
        navigate('/home');
      }
    },
    {
      text: 'About',
      variant: 'text',
      nvg: () => {
        navigate('/about');
      }
    },
    {
      text: 'Contact us',
      variant: 'text',
      nvg: () => {
        navigate('/contact-us');
      }
    }
  ];
  const account = [
    // {
    //   text: 'Profile',
    //   icon: 'person'
    // },
    // {
    //   text: 'Settings',
    //   icon: 'settings'
    // },
    {
      text: 'Logout',
      icon: 'logout',
      method: logout
    },
    {
      text: 'Dashboard',
      icon: 'dashboard',
      method: () => {
        navigate('/buyer/dashboard');
      }
    }
  ];

  function logout() {
    localStorage.removeItem('auth');
    setAuth(null);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color='white' position='static' className='light-shadow'>
        <Toolbar variant='dense'>
          <Container
            maxWidth='lg'
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <img src='/logo.png' width={50} />
            <Box className='d-flex'>
              <Box className='mt-2 mr-4'>
                {buttons.map((button, index) => {
                  return (
                    <BaseButton
                      onClick={() => {
                        button.nvg();
                      }}
                      size='small'
                      key={index}
                    >
                      {button.text}
                    </BaseButton>
                  );
                })}
              </Box>
              {!auth ? (
                <Box sx={style.authBox}>
                  <Box className='d-flex'>
                    <BaseButton
                      onClick={() => {
                        navigate('/auth/login');
                      }}
                      size='small'
                      variant='contained'
                      sx={style.loginBox}
                    >
                      Login
                    </BaseButton>{' '}
                    <Box sx={style.bar}>|</Box>{' '}
                    <BaseButton
                      onClick={() => {
                        navigate('/auth/signup');
                      }}
                      size='small'
                      variant='contained'
                      sx={style.signupBox}
                    >
                      Signup
                    </BaseButton>
                  </Box>
                </Box>
              ) : (
                <BaseMenu menuItems={account} anchorPosition='right' icon='account_circle' />
              )}
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const style = {
  authBox: {
    borderRadius: 50,
    border: `1px solid grey`,
    backgroundColor: 'primary.main'
  },
  loginBox: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    p: 1.5,
    py: 0.5
  },
  signupBox: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    p: 1.5,
    py: 0.5
  },
  bar: {
    pt: 0.3,
    color: 'white.main'
  }
};
