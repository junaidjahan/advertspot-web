import { Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { BaseButton, BaseForm, BaseTextField } from '~/components';
import { useAuth, useForm } from '~/hooks';
import { loginSchema } from '~/schemas';

export const Login = () => {
  const form = useForm({ schema: loginSchema });
  const {
    formState: { isValid, isSubmitting }
  } = form;

  const { login } = useAuth();

  const handleSubmit = async values => {
    await login(values);
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
            <BaseForm form={form} onSubmit={handleSubmit}>
              <Box sx={style.textField}>
                <BaseTextField fullWidth label='Email' name='email' type='email' autoFocus />
              </Box>
              <Box>
                <BaseTextField fullWidth label='Password' name='password' type='password' />
              </Box>
              <Box sx={style.button}>
                <BaseButton
                  variant='contained'
                  fullWidth
                  disabled={!isValid}
                  loading={isSubmitting}
                  size='small'
                  type='submit'
                >
                  Login
                </BaseButton>
              </Box>
              <Box sx={style.anchorContainer}>
                <p>
                  Don't have an Account? <Link to='/auth/signup'>Sign Up</Link>
                </p>
              </Box>
            </BaseForm>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const style = {
  container: {
    padding: '10px',
    py: 5,
    px: '40px',
    height: '100%'
  },
  loginForm: {
    border: '1px solid',
    borderColor: 'grey.light',
    borderRadius: '10px',
    px: '10px',
    py: 4
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
