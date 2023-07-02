import {
  Grid,
  Avatar,
  Typography,
  Stack,
  CardMedia,
  Rating,
  Box,
  Container,
  Chip,
  Link,
  Pagination
} from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import { useRecoilValue } from 'recoil';
import { BaseButton, BaseCard, BaseForm, BaseSelect, BaseTextField, Navbar } from '~/components';
import { authState, userState } from '~/state';
import { useForm, useGig } from '~/hooks';
import { useEffect, useState } from 'react';
import { useLoader } from '~/hooks/use-loader';
import { toTitleCase } from '~/global';
import { useNavigate } from 'react-router-dom';
import { jobFilterSchema } from '~/schemas';

export const Home = () => {
  const category = [
    { value: 'flex', label: 'Flex' },
    { value: 'banner', label: 'Banner' },
    { value: 'brochure', label: 'Brochure' },
    { value: 'digital-marketing', label: 'Digital Marketing' },
    { value: 'poster', label: 'Poster' },
    { value: 'flyer', label: 'Flyer' }
  ];
  const user = useRecoilValue(userState);
  const form = useForm({ schema: jobFilterSchema });
  const {
    formState: { isValid, isSubmitting },
    reset
  } = form;
  const { getAll, filterType } = useGig();
  const [gigs, setGigs] = useState([]);
  const [filter, setFilter] = useState(filterType);
  const { openLoader, closeLoader } = useLoader();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [clearFilter, setClearFilter] = useState(false);
  const navigate = useNavigate();

  const getAllGigs = () => {
    openLoader();
    getAll(filter)
      .then(res => {
        setGigs(res.data);
        setCount(Math.ceil(res.count / 12));
      })
      .finally(() => {
        closeLoader();
      });
  };

  const handleClear = () => {
    setFilter({ ...filter, ...filterType });
    reset();
    setClearFilter(false);
  };

  useEffect(() => {
    getAllGigs();
  }, [filter]);

  const handlePage = (event = null, value = 1) => {
    setFilter({ ...filter, pageNo: value, pageSize: 12 });
  };
  const handleSubmit = values => {
    setFilter({ ...filter, pageSize: -1, ...values });
    setClearFilter(true);
  };

  const GigDetails = id => {
    navigate(`/seller/gig/get-by-id/${id}`);
  };

  return (
    <div>
      <Navbar />

      <Container maxWidth='md' sx={style.container}>
        <BaseCard sx={style.adCard}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8} className='center-column'>
              <Box>
                <h1>Why we're here</h1>
                <p style={style.pText}>
                  We create opportunities for anyone in the world to build their business, brand, or dream.
                </p>
                <h3 style={style.lightWeight}>Find the Talent needed to get your business growing.</h3>
                <Box className='d-flex align-center '>
                  <Link href='#'>
                    <Chip sx={style.btnBox} icon={<PostAddIcon />} label='Poster' />
                  </Link>
                  <Link href='#'>
                    <Chip sx={style.btnBox} icon={<AddToQueueIcon />} label='Flex' />
                  </Link>
                  <Link href='#'>
                    <Chip sx={style.btnBox} icon={<AspectRatioIcon />} label='Banner' />
                  </Link>
                  <Box className='pt-10 ml-8'>
                    <p>and more</p>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={style.image} className='center-row'>
                <img src='/desk.png' height={500} alt='rocket' />
              </Box>
            </Grid>
          </Grid>
        </BaseCard>
      </Container>

      {/* searchbar */}
      <Box sx={{ p: 2 }}>
        <Typography align='center' sx={{ m: 2 }}>
          <h1 style={style.lightWeight}>Popular categories</h1>
        </Typography>
        <Container maxWidth='md' className='mb-20'>
          <BaseForm form={form} onSubmit={handleSubmit}>
            <Box className='d-flex'>
              <BaseTextField fullWidth label='Search' name='title' />
              <Box sx={style.categoryDrop}>
                <BaseSelect label='Category' name='category' options={category} />
              </Box>
              <Box>
                <BaseButton variant='contained' type='submit'>
                  Search
                </BaseButton>
              </Box>

              {clearFilter ? (
                <Box sx={{ mx: 1 }}>
                  <BaseButton onClick={handleClear} color='red' variant='outlined'>
                    Clear
                  </BaseButton>
                </Box>
              ) : undefined}
            </Box>
          </BaseForm>
        </Container>
        {gigs.length ? (
          <Grid container spacing={2}>
            {gigs.map((gig, idx) => (
              <Grid key={idx} item xs={3}>
                <BaseCard sx={{ cursor: 'pointer' }} onClick={() => GigDetails(gig.gig?._id)}>
                  <CardMedia component='img' alt='green iguana' height='200' image={gig?.gig?.images[0]} />
                  <Stack direction='row' spacing={2} sx={{ my: 2 }}>
                    <Avatar alt='Remy Sharp' src='/avatar.png' sx={{ width: 35, height: 35 }} />
                    <Stack direction='column'>
                      <Typography sx={style.name} component='div'>
                        {gig?.user?.firstName} {gig?.user?.lastName}
                      </Typography>
                      <Typography sx={style.category} component='div'>
                        {toTitleCase(gig?.gig?.category ?? '')}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Typography variant='body1' sx={{ my: 1 }}>
                    {gig?.gig?.title}
                  </Typography>
                  <Stack direction='row' justifyContent='space-between'>
                    <Rating name='read-only' value={4} readOnly precision={0.5} />
                    {/* <Stack direction='column'>
                      <Typography sx={style.pkr} component='div' variant='button'>
                        Starting at
                      </Typography>
                      <Typography component='div'>PKR {gig?.gig?.price}</Typography>
                    </Stack> */}
                  </Stack>
                </BaseCard>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box className='center-row'>
            {' '}
            <img src='/no-data.png' width={500} />{' '}
          </Box>
        )}
        <Box className='pb-30 mt-10 d-flex justify-end'>
          <Pagination count={count} page={filter.pageNo} onChange={handlePage} color='primary' />
        </Box>
      </Box>
    </div>
  );
};

const style = {
  container: {
    display: 'inline'
  },
  adCard: {
    backgroundColor: 'primary.dark',
    color: 'white.main',
    p: 7,
    overflow: 'hidden',
    borderRadius: 0
  },
  lightWeight: {
    fontWeight: '600'
  },
  tagLineBox: {
    m: 2
  },
  categoryDrop: {
    width: 400,
    mx: 2
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
    px: 3,
    ml: 1,
    mt: 1
  },
  textField: {
    my: '10px'
  },
  button: {
    display: 'flex',
    justifyContent: 'end'
  },
  image: { transform: 'translate(-10px, -20px)', pr: 20 },
  form: {
    mb: 4
  },
  poster: {
    m: '6'
  },
  name: {
    fontSize: 15
  },
  category: {
    fontSize: 15,
    p: 0,
    m: 0,
    color: 'grey.secondary'
  },
  pkr: {
    fontSize: 12,
    color: 'grey.secondary'
  },
  price: {}
};
