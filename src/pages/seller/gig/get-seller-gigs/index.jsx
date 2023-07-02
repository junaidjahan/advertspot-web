import { Avatar, Box, CardMedia, Container, Grid, Pagination, Rating, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BaseCard } from '~/components';
import { toTitleCase } from '~/global';
import { useGig } from '~/hooks';
import { useLoader } from '~/hooks/use-loader';

export const GetSellerGigs = () => {
  const { getGigBySellerId, filterType } = useGig();
  const [gigs, setGigs] = useState([]);
  const [filter, setFilter] = useState(filterType);
  const { openLoader, closeLoader } = useLoader();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [clearFilter, setClearFilter] = useState(false);
  const navigate = useNavigate();
  let { id } = useParams();

  const getAllGigs = () => {
    openLoader();
    getGigBySellerId(id, filter)
      .then(res => {
        setGigs(res.data);
        setCount(Math.ceil(res.count / 12));
      })
      .finally(() => {
        closeLoader();
      });
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
      <Container maxWidth='lg' className='mt-20'>
        <Box>
          <h2>My Gigs</h2>
          {gigs.length ? (
            <Grid container spacing={2} className='mt-8'>
              {gigs.map((gig, idx) => (
                <Grid key={idx} item xs={4}>
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
          <Box className='pb-30 d-flex justify-end'>
            <Pagination count={count} page={filter.pageNo} onChange={handlePage} color='primary' />
          </Box>
        </Box>
      </Container>
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
