import { Grid, Avatar, Typography, Stack, CardMedia, Rating, Box } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { BaseCard, CardWrapper, Navbar } from '~/components';
import { userState } from '~/state';

export const Home = () => {
  const user = useRecoilValue(userState);
  const gigs = [{
    gig_image:'https://www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.jpg',
    avatar:'https://308286-943399-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2022/03/cute-nice-dp-for-whatsapp.png',
    name:'Ali',
    gig_description:'aldkakdklakdldkawlkdl;wadkl;wakdalwk',
    rating:4,
    price:2000,
  }]
  return (
    <div>
      <Navbar />
      {/* searchbar */}
      <Box sx={{ p: 2 }}>
        <Typography align='center' sx={{ m: 2 }}>
          Popular technology & programming categories
        </Typography>
        <Grid container spacing={2}>
          {gigs.map((g, idx) => (
            <Grid key={idx} item xs={3}>
              <BaseCard sx={{ cursor: 'pointer' }} onClick={() => console.log('card pressed')}>
                <CardMedia component='img' alt='green iguana' height='200' image={g?.gig_image} />
                <Stack direction='row' spacing={2} sx={{ my: 2 }}>
                  <Avatar alt='Remy Sharp' src={gigs[0].avatar} sx={{ width: 56, height: 56 }} />
                  <Typography gutterBottom variant='h5' component='div' alignSelf='center'>
                    {g.name}
                  </Typography>
                </Stack>

                <Typography variant='body1' color='text.secondary' sx={{ my: 1 }}>
                  {g.gig_description}
                </Typography>
                <Stack direction='row' justifyContent='space-between'>
                  <Rating name='read-only' value={g.rating} readOnly precision={0.5} />
                  <Typography variant='body1' color='text.secondary'>
                    Starting from Pkr {g.price}
                  </Typography>
                </Stack>
              </BaseCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};
