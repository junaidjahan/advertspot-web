import {
  Box,
  Container,
  Grid,
  Icon,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Stack
} from '@mui/material';
import { BaseButton, BaseCard, BaseForm, BaseSelect, BaseTextField, Navbar } from '~/components';
import { useForm, useJob } from '~/hooks';
import { jobSchema } from '~/schemas';
import { userState } from '~/state';
import { useForm as useHookForm } from 'react-hook-form';

export const About = () => {
  return (
    <div>
      <Navbar />
      <Container maxWidth='md' sx={style.container}>
        <Grid item xs={12} md={8} className='center-column'></Grid>
        <BaseCard sx={style.adCard}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8} className='center-column'>
              <Box>
                <h1 style={style.lightWeight}>Our Team!</h1>
                <p style={style.pText}>We're a big team, comprised of pretty small teams, powered by unique minds</p>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={style.image} className='center-row'>
                <img src='/team.png' height={300} alt='rocket' />
              </Box>
            </Grid>
          </Grid>
        </BaseCard>
      </Container>
      <Typography align='center' sx={{ m: 2 }}>
        <h1 style={style.lightWeight}>The AdvertSpot Way</h1>
      </Typography>

      <Grid container spacing={2} mt={2} ml={2}>
        <Grid xs={12} md={3}>
          <Card elevation={0} item xs={4} sx={{ maxWidth: 300 }}>
            <CardMedia component='img' height='200' image='/quality.png' alt='green iguana' />
            <CardContent>
              <h2 style={style.lightWeight}>Quality</h2>
              <p>We challenge ourselves and our teams to aim higher.</p>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} md={3}>
          <Card elevation={0} item xs={4} sx={{ maxWidth: 300 }}>
            <CardMedia component='img' height='200' image='/rules.png' alt='green iguana' />
            <CardContent>
              <h2 style={style.lightWeight}>Data Rules</h2>
              <p>Data wins every argument. There’s data to support this.</p>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} md={3}>
          <Card elevation={0} item xs={4} sx={{ maxWidth: 300 }}>
            <CardMedia component='img' height='200' image='/speed.png' alt='green iguana' />
            <CardContent>
              <h2 style={style.lightWeight}>Speed Matters</h2>
              <p>Moving quickly allows us to test things, learn, and iterate.</p>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} md={3}>
          <Card elevation={0} item xs={4} sx={{ maxWidth: 300 }}>
            <CardMedia component='img' height='200' image='/celebrate.png' alt='green iguana' />
            <CardContent>
              <h2 style={style.lightWeight}>Celebrate</h2>
              <p>When we win, we take a moment to celebrate.</p>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Container maxWidth='md' sx={style.container}>
        <Grid item xs={12} md={8} className='center-column'></Grid>
        <BaseCard sx={style.adCard}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8} className='center-column'>
              <Box>
                <h1 style={style.lightWeight}>Come change the way the world works</h1>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={style.image} className='center-row'>
                <img src='/world.png' height={300} alt='rocket' />
              </Box>
            </Grid>
          </Grid>
        </BaseCard>
      </Container>

      <Typography align='center' sx={{ m: 2 }}>
        <h3 style={style.lightWeight}>We're a big team, comprised of pretty small teams, powered by unique minds</h3>
      </Typography>

      <Grid container mt={2} ml={2}>
        <Grid xs={12} md={3}>
          <Card elevation={0} item xs={4} sx={{ maxWidth: 300 }}>
            <CardMedia component='img' height='200' image='/tech.png' alt='green iguana' />
            <CardContent>
              <h2 style={style.lightWeight}>Technology</h2>
              <p>Perfecting the platform and applications with cutting-edge Technologies.</p>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} md={3}>
          <Card elevation={0} item xs={4} sx={{ maxWidth: 300 }}>
            <CardMedia component='img' height='200' image='/product.png' alt='green iguana' />
            <CardContent>
              <h2 style={style.lightWeight}>Product</h2>
              <p>Make an impact on the way the world works together.</p>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} md={3}>
          <Card elevation={0} item xs={4} sx={{ maxWidth: 300 }}>
            <CardMedia component='img' height='200' image='/data.png' alt='green iguana' />
            <CardContent>
              <h2 style={style.lightWeight}>Data</h2>
              <p>The launchpad for successful data careers.</p>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} md={3}>
          <Card elevation={0} item xs={4} sx={{ maxWidth: 300 }}>
            <CardMedia component='img' height='200' image='/design.png' alt='green iguana' />
            <CardContent>
              <h2 style={style.lightWeight}>Design</h2>
              <p>Cultivate your creative career on a global stage.</p>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} md={3}>
          <Card elevation={0} item xs={4} sx={{ maxWidth: 300 }}>
            <CardMedia component='img' height='200' image='/market.png' alt='green iguana' />
            <CardContent>
              <h2 style={style.lightWeight}>Marketing</h2>
              <p>Living and breathing the AdvertSpot brand.</p>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} md={3}>
          <Card elevation={0} item xs={4} sx={{ maxWidth: 300 }}>
            <CardMedia component='img' height='200' image='/business.png' alt='green iguana' />
            <CardContent>
              <h2 style={style.lightWeight}>Business</h2>
              <p>Leading global expansion to level the professional playing field.</p>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} md={3}>
          <Card elevation={0} item xs={4} sx={{ maxWidth: 300 }}>
            <CardMedia component='img' height='200' image='/legal.png' alt='green iguana' />
            <CardContent>
              <h2 style={style.lightWeight}>Legal, HR and Operations</h2>
              <p>The backbone of AdvertSpot's culture.</p>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} md={3}>
          <Card elevation={0} item xs={4} sx={{ maxWidth: 300 }}>
            <CardMedia component='img' height='200' image='/finance.png' alt='green iguana' />
            <CardContent>
              <h2 style={style.lightWeight}>Finance</h2>
              <p>Bill, Budget, Balances and Beyond.</p>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

const style = {
  container: {
    py: 3,
    display: 'inline'
  },
  adCard: {
    backgroundColor: 'primary.dark',
    color: 'white.main',
    p: 12,
    pb: 7,
    overflow: 'hidden',
    borderRadius: 0
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
