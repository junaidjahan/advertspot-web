import { Box, Chip, Icon } from '@mui/material';
import { BaseButton } from '~/components/base';
import { jobSchema } from '~/schemas';

export const JobPostCard = ({ job, sx }) => {
  return (
    <Box sx={style.container}>
      <Box>
        <Box className='d-flex justify-space-between'>
          <Box>
            <h3 style={style.title}>{job.Title}</h3>
          </Box>
          <Box>
            <BaseButton>view</BaseButton>
          </Box>
        </Box>
        <Box>
          <Box>
            <p style={style.budget} className='d-flex'>
              Budget: {job.Budget}
            </p>
          </Box>
          <Box className='d-flex mt-5'>
            <Icon>location_on</Icon> <p style={style.locationTitle}> {job.Location}</p>
          </Box>
          <Box className='pl-5 mt-5'>{job.Description}</Box>
          <Box className='mt-5'>
            <Chip label={job.Type} />
          </Box>
          <Box className='d-flex pl-5 mt-5'>
            <p>Proposals:</p> <h4 style={style.proposals}> {job.Proposals}</h4>
          </Box>
          <Box className='d-flex'>
            <p style={style.payment}>
              Payment <span>Unverified</span>{' '}
            </p>
            <span>
              <Icon sx={style.paymentIcon}> dangerous</Icon>
            </span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const style = {
  container: {
    backgroundColor: 'white.main',
    p: 2,
    px: 3,
    my: 2,
    borderRadius: 5
  },
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
  }
};
