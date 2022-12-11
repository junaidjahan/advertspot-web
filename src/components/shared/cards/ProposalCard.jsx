import { Avatar, Box, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BaseButton, BaseCard } from '~/components/base';

export const ProposalCard = ({ data }) => {
  const navigate = useNavigate();

  const getById = id => {
    navigate(`/buyer/proposals/proposal-details/${id}`);
  };

  return (
    <Grid item xs={3}>
      <BaseCard className='mt-10' sx={{ cursor: 'pointer' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar alt='Remy Sharp' src='/avatar.png' sx={{ width: 50, height: 50 }} />

            <Typography sx={style.name} component='div'>
              {data?.user?.firstName} {data.user?.lastName}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={style.pr} component='div'>
              PKR {data?.proposal?.Amount}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <BaseButton
            onClick={() => {
              getById(data.proposal?._id);
            }}
            size='small'
            variant='outlined'
          >
            View
          </BaseButton>
        </Box>
      </BaseCard>
    </Grid>
  );
};

const style = {
  budget: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'grey',
    paddingLeft: 5
  },
  title: {
    fontSize: 20,
    fontWeight: 600
  },
  pr: {
    fontWeight: '500',
    color: 'primary.main'
  },
  payment: {
    fontSize: 15,
    fontWeight: 400,
    color: 'grey',
    marginLeft: 2
  },
  paymentIcon: {
    fontSize: 20,
    backgroundColor: 'grey',
    ml: 1
  },
  locationTitle: {
    fontSize: 15
  },
  proposals: {
    marginLeft: 2
  },
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
    fontSize: 15,
    ml: 2
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
