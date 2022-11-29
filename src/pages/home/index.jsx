import { Grid, Avatar, Typography, Stack, CardMedia, Rating, Box, Container, Chip, Link } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import { display } from '@mui/system';
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

      <Container maxWidth='md' sx={style.container}>
        <BaseCard sx={style.adCard}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8} className='center-column'>
              <Box>
                <h1 >Why we're here</h1>
                <p style={style.pText}>
                  We create opportunities for anyone in the world to build their business, brand, or dream. 
                </p>
                <h3 style={style.lightWeight}>Find the Talent needed to get your business growing.</h3>
                <Link href="#">
                  <Chip sx={style.btnBox} icon={<PostAddIcon />} label="Poster"  />
                </Link>
                <Link href="#">
                  <Chip sx={style.btnBox} icon={<AddToQueueIcon />} label="Flex" />
                </Link>
                <Link href="#">
                  <Chip sx={style.btnBox} icon={<AspectRatioIcon />} label="Banner" />
                </Link>

              </Box>
            {/* <Grid sx={style.adCard}>
                <Box sx={style.btnBox}>
                  <h5 style={style.lightWeight}>Banners</h5>
                </Box>
                <Box sx={style.btnBox}>
                  <h5 style={style.lightWeight}>Flexes</h5>
                </Box>
                <Box sx={style.btnBox}>
                  <h5 style={style.lightWeight}>Posters</h5>
                </Box>
            </Grid> */}


            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={style.image} className='center-row'>
                <img src='/welcome.png' height={300} alt='rocket' />
              </Box>
            </Grid>
          </Grid>
        </BaseCard>
      </Container>


      {/* searchbar */}
      <Box sx={{ p: 2 }}>
        <Typography align='center' sx={{ m: 2 }}>
          <h1 style={style.lightWeight}>Popular Banner & Flex categories</h1>
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




const style = {
  container: {
    py: 3,    
    display:'inline'

  },
  adCard: {
    backgroundColor: 'primary.dark',
    color: 'white.main',
    p: 12,
    pb: 7,
    overflow: 'hidden',
    borderRadius:0
  },
  lightWeight: {
    fontWeight: '600',
    
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
    px: 3,
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
  },
  poster: {
    m:'6'
  }
};
