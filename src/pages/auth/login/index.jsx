import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '~/hooks';
import { BaseButton, BaseTextField } from '../../../components/base';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();

  const handleLogin = async () => {
    await login({ email, password });
  };

  return (
    <Box sx={style.container}>
      <Box sx={style.loginForm}>
        <Box sx={{ textAlign: 'center' }}>
          <h2 className='darkGrey' style={style.title}>
            Welcome Back
          </h2>
        </Box>
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item xs={12} md={6}>
            <Box sx={style.textField}>
              <BaseTextField
                fullWidth
                label='Email'
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
            </Box>
            <Box>
              <BaseTextField
                fullWidth
                label='Password'
                type='password'
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
            </Box>
            <Box sx={style.button}>
              <BaseButton variant='contained' fullWidth={true} size='small' onClick={handleLogin}>
                Login
              </BaseButton>
            </Box>
            <Box sx={style.anchorContainer}>
              <p>
                Don't have an Account? <Link to='/auth/signup'>Sign Up</Link>
              </p>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const style = {
  container: {
    padding: '10px',

    px: '40px',
    pt: '20px',
    height: '100%'
  },
  loginForm: {
    border: '1px solid',
    borderColor: 'grey.light',
    borderRadius: '10px',
    px: '10px'
  },
  formCenter: {
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    py: '20px'
  },
  textField: {
    my: '10px'
  },
  button: {
    my: '10px'
  },
  title: {
    marginBottom: '0px',
    fontSize: '30px',
    fontWeight: '600'
  },
  anchorContainer: {
    marginTop: '0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};
