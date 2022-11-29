import { Box, Icon } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const BackPage = () => {
  const navigate = useNavigate();

  const back = () => {
    navigate(-1);
  };
  return (
    <Box
      className='d-flex mt-5 align-center cursor-pointer'
      onClick={() => {
        back();
      }}
    >
      <Icon sx={style.icon}>arrow_back_ios</Icon> <p style={style.iconTitle}> Back </p>
    </Box>
  );
};

const style = {
  icon: {
    color: '#9B57F2',
    fontSize: 18,
    pt: 0.5
  },

  iconTitle: {
    fontSize: 17,
    color: '#9B57F2'
  }
};
