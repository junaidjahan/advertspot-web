import { Box, Container, Grid, Icon, InputAdornment } from '@mui/material';
import { BaseButton, BaseCard, BaseForm, BaseSelect, BaseTextField } from '~/components';
import { useForm, useJob, useSnackbar } from '~/hooks';
import { jobSchema } from '~/schemas';
import { userState } from '~/state';
import { useForm as useHookForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useLoader } from '~/hooks/use-loader';
import GoogleMapComponent from '~/components/shared/google-maps';
import { useNavigate } from 'react-router-dom';

export const PostJob = () => {
  const jobSteps = ['1. Post a job to the marketplace', '2. Get proposals from talent', '4. Pay for work you approve'];
  const jobType = [
    { value: 'flex', label: 'Flex' },
    { value: 'banner', label: 'Banner' },
    { value: 'brochure', label: 'Brochure' },
    { value: 'digital-marketing', label: 'Digital Marketing' },
    { value: 'poster', label: 'Poster' },
    { value: 'flyer', label: 'Flyer' }
  ];

  const sizeType = [
    { value: 'inch', label: 'Inches' },
    { value: 'foot', label: 'Feets' }
  ];
  const durationType = [
    { value: 'hours', label: 'Hours' },
    { value: 'days', label: 'Days' },
    { value: 'weeks', label: 'Weeks' },
    { value: 'months', label: 'Months' },
    { value: 'years', label: 'Years' }
  ];
  const form = useForm({ schema: jobSchema });
  //   const { reset } = useHookForm({ defaultValues: { Title: '', Budget: '' } });
  const {
    formState: { isValid, isSubmitting },
    reset,
    setValue
  } = form;
  const { open } = useSnackbar();
  const { openLoader, closeLoader } = useLoader();
  const { saveJob, getAllCities } = useJob();
  const [location, setLocation] = useState();
  const [cities, setCities] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    getAllCities().then(res => {
      setCities(res[0].cities);
    });
  }, []);

  const handleSubmit = async values => {
    openLoader();
    await saveJob(values);
    closeLoader();
    open('Job created successdfully!');
    reset();
    navigate('/buyer/dashboard')
  };

  return (
    <div>
      <Container maxWidth='md' sx={style.container}>
        <BaseCard sx={style.adCard}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8} className='center-column'>
              <Box>
                <h1 style={style.lightWeight}>Advertise with us!</h1>
                <p style={style.pText}>
                  The most wallet-friendly way to hire anyone, anywhere in Pakistan. It's everything you love about
                  AdverSpot, and more.
                </p>
                <Box sx={style.tagLineBox}>
                  {jobSteps.map((line, index) => {
                    return (
                      <h3 style={style.lightWeight} key={index}>
                        {line}
                      </h3>
                    );
                  })}
                </Box>
                <Box sx={style.btnBox}>
                  <h5 style={style.lightWeight}>Post a job Today!</h5>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={style.image} className='center-row'>
                <img src='/rocket.png' height={300} alt='rocket' />
              </Box>
            </Grid>
          </Grid>
        </BaseCard>
        <BaseCard>
          <h1>Post</h1>
          <BaseForm form={form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box sx={style.textField}>
                  <BaseTextField fullWidth required label='Title' name='Title' />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={style.textField}>
                  <BaseTextField fullWidth required label='Quantity' name='Quantity' />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={style.textField}>
                  <BaseTextField
                    InputProps={{
                      endAdornment: <InputAdornment position='start'>Pkr</InputAdornment>
                    }}
                    type='number'
                    required
                    fullWidth
                    label='Budget'
                    name='Budget'
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={style.textField}>
                  <BaseSelect fullWidth required={true} label='Type' options={jobType} name='Type' />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={style.textField}>
                  <BaseTextField type='number' fullWidth label='Height' name='Height' />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={style.textField}>
                  <BaseSelect fullWidth label='Unit' options={sizeType} name='Unit' />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={style.textField}>
                  <BaseTextField type='number' fullWidth label='Width' name='Width' />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={style.textField}>
                  <BaseSelect fullWidth label='Unit' options={sizeType} name='Unit' />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={style.textField}>
                  <BaseTextField type='number' required fullWidth label='Delivery' name='Delivery' />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={style.textField}>
                  <BaseSelect fullWidth label='Duration' options={durationType} name='Duration' />
                </Box>
              </Grid>
              <Grid item md={12}>
                <Box sx={style.textField}>
                  {/* <BaseSelect fullWidth required={true} label='Location' options={cities} name='Location' /> */}
                  <BaseTextField
                    className='mb-30'
                    value={location}
                    focused={location}
                    onChange={e =>{ setLocation(e.target.value), setValue('Location',e.target.value)}}
                    fullWidth
                    required
                    id='Location'
                    label='Location'
                    name='Location'
                  />
                  <GoogleMapComponent location={(e)=>{ setLocation(e); setValue('Location',e)}} />
                </Box>
              </Grid>

              <Grid item md={12}>
                <Box sx={style.textField}>
                  <BaseTextField rows={4} multiline fullWidth label='Description' name='Description' />
                </Box>
              </Grid>

              <Grid item md={12}>
                <Box sx={style.button}>
                  <BaseButton variant='contained' disabled={!isValid} loading={isSubmitting} size='small' type='submit'>
                    Post
                  </BaseButton>
                </Box>
              </Grid>
            </Grid>
          </BaseForm>
        </BaseCard>
      </Container>
    </div>
  );
};

const style = {
  container: {
    py: 3
  },
  adCard: {
    backgroundColor: 'primary.dark',
    color: 'white.main',
    my: 4,
    px: 3,
    pb: 0,
    overflow: 'hidden'
  },
  lightWeight: {
    fontWeight: '600'
  },
  tagLineBox: {
    m: 2
  },

  pText: {
    fontSize: 13
  },
  btnBox: {
    backgroundColor: 'white.main',
    borderRadius: 50,
    color: 'black.main',
    width: 'max-content',
    p: 1,
    px: 3
  },
  textField: {
    my: '10px'
  },
  button: {
    display: 'flex',
    justifyContent: 'end'
  },
  image: { transform: 'translate(-10px, -20px)' },
  form: {
    mb: 4
  }
};
