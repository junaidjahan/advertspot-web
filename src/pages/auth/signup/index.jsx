import { Box, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useForm, useSnackbar } from '~/hooks';
import { useLoader } from '~/hooks/use-loader';
import { loginSchema, signupSchema } from '~/schemas';
import { BaseButton, BaseForm, BaseSelect, BaseTextField } from '../../../components/base';

export const Signup = () => {
  const form = useForm({ schema: signupSchema });
  const { signup } = useAuth();
  const { openLoader, closeLoader } = useLoader();
  const { open } = useSnackbar();
  const navigate = useNavigate();
  const {
    formState: { isValid, isSubmitting }
  } = form;

  const handleSubmit = async values => {
    openLoader();
    await signup(values);
    closeLoader();
    open('Signed up successfully!');
    navigate('/auth/login');
  };

  return (
    <Box sx={style.container}>
      <Box sx={style.signupForm}>
        <Box sx={{ textAlign: 'center' }}>
          <h2 className='primary' style={style.title}>
            Create an account
          </h2>
        </Box>
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item xs={12} md={6}>
            <BaseForm form={form} onSubmit={handleSubmit}>
              <Box sx={style.textField}>
                <BaseTextField fullWidth label=' First Name' name='firstName' />
              </Box>
              <Box sx={style.textField}>
                <BaseTextField fullWidth label=' Last Name' name='lastName' />
              </Box>
              <Box sx={style.textField}>
                <BaseTextField fullWidth label=' Email' name='email' />
              </Box>
              <Box sx={style.textField}>
                <BaseTextField fullWidth label=' Phone Number' name='phoneNumber' />
              </Box>
              <Box sx={style.textField}>
                <BaseTextField fullWidth label='Password' type='password' name='password' />
              </Box>
              <Box sx={style.textField}>
                <BaseTextField fullWidth label='Confirm Password' type='password' name='confirmPassword' />
              </Box>
              <Box>
                <BaseSelect
                  fullWidth
                  label='Are you'
                  options={[
                    { value: 'buyer', label: 'Buyer' },
                    { value: 'seller', label: 'Seller' }
                  ]}
                  name='userType'
                />
              </Box>

              <Box sx={style.button}>
                <BaseButton
                  disabled={!isValid}
                  loading={isSubmitting}
                  type='submit'
                  variant='contained'
                  fullWidth={true}
                  size='small'
                >
                  Signup
                </BaseButton>
              </Box>
              <Box sx={style.anchorContainer}>
                <p>
                  Already have an Account? <Link to='/auth/login'>Login</Link>
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

    px: '40px',
    pt: '20px',
    height: '100%'
  },
  signupForm: {
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
    fontSize: '2rem',
    fontWeight: '600'
  },
  anchorContainer: {
    marginTop: '0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};
