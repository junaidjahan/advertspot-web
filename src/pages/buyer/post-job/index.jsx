import { Box, Container, Grid, Icon } from '@mui/material';
import { BaseButton, BaseCard, BaseForm, BaseSelect, BaseTextField } from '~/components';
import { useForm, useJob } from '~/hooks';
import { jobSchema } from '~/schemas';
import { userState } from '~/state';
import { useForm as useHookForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

export const PostJob = () => {
  const jobSteps = ['1. Post a job to the marketplace', '2. Get proposals from talent', '4. Pay for work you approve'];
  const jobType = [
    { value: 'Flex', label: 'Flex' },
    { value: 'Banner', label: 'Banner' },
    { value: 'Brochure', label: 'Brochure' },
    { value: 'Digital Marketing', label: 'Digital Marketing' },
    { value: 'Poster', label: 'Poster' },
    { value: 'Flyer', label: 'Flyer' }
  ];
  const form = useForm({ schema: jobSchema });
  //   const { reset } = useHookForm({ defaultValues: { Title: '', Budget: '' } });
  const {
    formState: { isValid, isSubmitting },
    reset
  } = form;

  const { saveJob, getAllCities } = useJob();

  const [cities, setCities] = useState([]);

  useEffect(() => {
    getAllCities().then(res => {
      setCities(res[0].cities);
    });
  }, []);

  const handleSubmit = async values => {
    await saveJob(values);
    reset();
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
                  <BaseTextField fullWidth required label='Dimensions' name='Dimensions' />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={style.textField}>
                  <BaseTextField fullWidth required label='Budget' name='Budget' />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={style.textField}>
                  <BaseSelect fullWidth required={true} label='Type' options={jobType} name='Type' />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={style.textField}>
                  <BaseSelect fullWidth required={true} label='Location' options={cities} name='Location' />
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
