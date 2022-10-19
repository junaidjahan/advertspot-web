import { AppBar, Box, Container, Toolbar } from '@mui/material';
import { BaseButton, BaseMenu, BaseTextField } from '~/components';

export const BuyerNavbar = () => {
  const jobs = [
    {
      text: 'My Jobs'
    },
    {
      text: 'All Job Posts'
    },
    {
      text: 'All Contracts'
    },
    {
      text: 'Post a Job'
    }
  ];
  const browse = [
    {
      text: 'Project Catalogs'
    },
    {
      text: 'Categories'
    }
  ];
  const notifications = [
    {
      text: 'Notifications will be displayed here'
    }
  ];
  const account = [
    {
      text: 'Profile',
      icon: 'person'
    },
    {
      text: 'Settings',
      icon: 'settings'
    },
    {
      text: 'Logout',
      icon: 'logout'
    }
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={style.appBar} color='white' position='static' className='light-shadow'>
        <Toolbar variant='dense'>
          <Container maxWidth='lg' sx={style.container}>
            <Box sx={style.itemsBox}>
              <img src='/logo.png' width={50} style={style.image} />
              <BaseMenu menuItems={jobs} buttonText='Jobs' />
              <BaseMenu menuItems={browse} buttonText='Browse' />
              <BaseButton size='small' color='black' sx={style.messages}>
                Messages
              </BaseButton>
            </Box>
            <Box sx={style.itemsBox}>
              <BaseTextField label='Search' />
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
