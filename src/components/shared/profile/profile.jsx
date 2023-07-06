import { Avatar, Box, Container, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { BaseButton, BaseCard, BaseForm, BaseTextField } from '~/components/base';
import { useAuth, useAxios, useSnackbar } from '~/hooks';
import { loginSchema } from '~/schemas';
import { userState } from '~/state';

export const Profile = () => {
  const [user, setUser] = useRecoilState(userState);
  const { updateUser,  } = useAuth();
  const {  get } = useAxios();
  const { open } = useSnackbar();
  const form = useForm({ schema: loginSchema });
  const {
    formState: { isValid, isSubmitting },
    setValue
  } = form;

  const handleSubmit = async values => {
    try{
        await updateUser(values);
        setUser(await get('/auth/profile'));
        open('Profile updated successfully!');
    }catch{
        open("Something went wrong!")
    }

  };

  return (
    <>
      <Container maxWidth='md' className='pt-10 pb-10'>
        <h1
          style={{ fontSize: '6rem', fontWeight: '500', paddingLeft: '1rem', color: '#dfdfdf', position: 'absolute' }}
        >
          Profile
        </h1>
        <Box style={{ marginTop: '4.9rem', zIndex: 10, position: 'absolute' }}>
          <BaseCard className='mt-20' style={{ width: '900px' }}>
            <Box
              className='d-flex  mt-10 mb-20'
              sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            >
              <Avatar alt='Remy Sharp' src='/avatar2.png' sx={{ width: 120, height: 120 }} />
            </Box>
            <BaseForm form={form} onSubmit={handleSubmit}>
              <Grid container direction='row' rowGap={2} columnSpacing={2}>
                <Grid item xs={12} md={6}>
                  <BaseTextField value={user.firstName} onChange={e =>{ setUser((prev,curr)=>{return {...prev, firstName:e.target.value}}), setValue('firstName',user.firstName)}}  fullWidth label='First Name' name='firstName' />
                </Grid>
                <Grid item xs={12} md={6}>
                  <BaseTextField value={user.lastName} onChange={e =>{ setUser((prev,curr)=>{return {...prev, lastName:e.target.value}}), setValue('lastName', user.lastName)}}  focused fullWidth label='Last Name' name='lastName' />
                </Grid>
                <Grid item xs={12} md={6}>
                  <BaseTextField value={user.email}   focused fullWidth label='Email' name='email' />
                </Grid>
                <Grid item xs={12} md={6}>
                  <BaseTextField value={user.phone} onChange={e =>{ setUser((prev,curr)=>{return {...prev, phone:e.target.value}}), setValue('phone', user.phone)}}  fullWidth focused label='Phone Number' name='phone' />
                </Grid>
                <Grid item xs={12} md={12}>
                  <div className='d-flex' style={{ justifyContent: 'end' }}>
                    <BaseButton disabled={!isValid} loading={isSubmitting} type='submit' variant='contained'>
                      Save
                    </BaseButton>
                  </div>
                </Grid>
              </Grid>
            </BaseForm>
          </BaseCard>
        </Box>
      </Container>
    </>
  );
};
