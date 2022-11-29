import {
  Box,
  Container,
  Grid,
  Button,
  Stack,
  Icon,
  Autocomplete,
  TextField,
  ImageListItem,
  ImageList
} from '@mui/material';
import { BaseButton, BaseCard, BaseForm, BaseSelect, BaseTextField } from '~/components';
import { useForm, useJob } from '~/hooks';
import { useForm as useHookForm } from 'react-hook-form';
import { gigSchema } from '~/schemas';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { SetMealOutlined } from '@mui/icons-material';
import { useGig } from '~/hooks/use-gig';
import { uploadImage } from '../.../../../../services/cloudinary';
import { useState } from 'react';
import { useLoader } from '~/hooks/use-loader';

export const CreateGig = () => {
  const jobSteps = ['1. Post services through Gigs.', '2. Get Orders from Clients', '4. Get Paid'];
  const jobType = [
    { value: 'flex', label: 'Flex' },
    { value: 'banner', label: 'Banner' },
    { value: 'brochure', label: 'Brochure' },
    { value: 'digital-marketing', label: 'Digital Marketing' },
    { value: 'poster', label: 'Poster' },
    { value: 'Flyer', label: 'Flyer' }
  ];
  const form = useForm({ schema: gigSchema });
  //   const { reset } = useHookForm({ defaultValues: { Title: '', Budget: '' } });
  const {
    formState: { isValid, isSubmitting },
    reset
  } = form;

  const { saveGig } = useGig();

  const removeImages = () => {
    setPreviewImages([]);
    form.setValue('Image', []);
  };

  const { openLoader, closeLoader } = useLoader();

  const [PreviewImages, setPreviewImages] = useState([]);

  const handleSubmit = async values => {
    openLoader();
    uploadImage(values.Image)
      .then(async imagesUrl => {
        // console.log('Images Url', imagesUrl);
        form.setValue('images', imagesUrl);
        const data = { ...form.getValues() };
        await saveGig(data);
        closeLoader();
        reset();
        removeImages();
      })
      .finally(() => {
        closeLoader();
      });
  };

  const setImages = e => {
    form.setValue('Image', e.target.files);
    setPreviewImages([...e.target.files]);
    // console.log([...form.getValues().Image]);
  };

  const getImageUrl = item => {
    // console.log(item);
    // const reader = new FileReader();
    // reader.readAsDataURL(item);
    const url = URL.createObjectURL(item);

    return `${url}?w=100&h=100&fit=crop&auto=format`;
  };

  return (
    <div>
      <Container maxWidth='md' sx={style.container}>
        <BaseCard sx={style.adCard}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8} className='center-column'>
              <Box>
                <h1 style={style.lightWeight}>Sell with us!</h1>
                <p style={style.pText}>
                  The most wallet-friendly way to sell services, anywhere in Pakistan. It's everything you love about
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
                  <h5 style={style.lightWeight}>Post a Gig Today!</h5>
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
          <h1>Create A Gig</h1>
          <BaseForm form={form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box sx={style.textField}>
                  <BaseTextField required fullWidth label='Title' name='title' />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={style.textField}>
                  <BaseTextField required fullWidth label='Price' name='price' />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={style.textField}>
                  <BaseTextField required fullWidth label='Quantity' name='quantity' />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={style.textField}>
                  <BaseTextField fullWidth label='Dimension' name='dimensions' />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={style.textField}>
                  <BaseTextField required fullWidth label='Delivery' name='delivery' />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={style.textField}>
                  <BaseSelect fullWidth required={true} label='Type' options={jobType} name='category' />
                </Box>
              </Grid>
              <Grid item xs={12} md={12}>
                <Box sx={style.textField}>
                  <BaseTextField rows={4} multiline fullWidth label='Description' name='description' />
                </Box>
              </Grid>
              <Grid item xs={12} md={12}>
                <Box sx={{ border: '1px solid grey', borderRadius: '4px' }}>
                  {!PreviewImages.length > 0 ? (
                    <Stack
                      direction='row'
                      sx={{ p: 10 }}
                      justifyContent='space-around'
                      alignSelf='center'
                      alignItems='center'
                    >
                      <Button variant='outlined' component='label' startIcon={<PhotoCamera />}>
                        Upload
                        <input hidden accept='image/*' onChange={e => setImages(e)} multiple type='file' />
                      </Button>
                    </Stack>
                  ) : null}

                  {PreviewImages.length > 0 ? (
                    <>
                      {' '}
                      <ImageList sx={{ width: '100%', height: 200, px: 10 }} cols={4} rowHeight={100}>
                        {PreviewImages.map((item, idx) => (
                          <ImageListItem key={idx}>
                            <img
                              // src={`${URL.createObjectURL(item)}`}
                              src={getImageUrl(item)}
                              srcSet={`${URL.createObjectURL(item)}`}
                              alt='img'
                              loading='lazy'
                              height='200'
                            />
                          </ImageListItem>
                        ))}
                      </ImageList>
                      <Stack
                        direction='row'
                        sx={{ mb: 1 }}
                        justifyContent='center'
                        alignSelf='center'
                        alignItems='center'
                      >
                        <Button variant='outlined' sx={{ mx: 1 }} component='label' startIcon={<PhotoCamera />}>
                          Upload
                          <input hidden accept='image/*' onChange={e => setImages(e)} multiple type='file' />
                        </Button>
                        <Button
                          variant='outlined'
                          onClick={() => {
                            removeImages();
                          }}
                          color='error'
                          sx={{ mx: 1 }}
                          component='label'
                          startIcon={<PhotoCamera />}
                        >
                          Remove All
                        </Button>
                      </Stack>{' '}
                    </>
                  ) : null}
                </Box>
              </Grid>
              <Grid item md={12}>
                <Box sx={style.button}>
                  <BaseButton variant='contained' disabled={!isValid} loading={isSubmitting} size='small' type='submit'>
                    Create Gig
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
