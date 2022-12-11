import { Box, Container, Pagination } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { BaseButton, BaseForm, BaseSelect, BaseTextField, JobPostCard } from '~/components';
import { useForm, useJob, useSnackbar } from '~/hooks';
import { useLoader } from '~/hooks/use-loader';
import { jobFilterSchema, jobSchema } from '~/schemas';

export const AllJobs = () => {
  const category = [
    { value: 'Flex', label: 'Flex' },
    { value: 'Banner', label: 'Banner' },
    { value: 'Brochure', label: 'Brochure' },
    { value: 'Digital Marketing', label: 'Digital Marketing' },
    { value: 'Poster', label: 'Poster' },
    { value: 'Flyer', label: 'Flyer' }
  ];
  const form = useForm({ schema: jobFilterSchema });
  const {
    formState: { isValid, isSubmitting },
    reset
  } = form;

  const { getAll, filterType } = useJob();
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState(filterType);
  const { openLoader, closeLoader } = useLoader();
  const [count, setCount] = useState(1);
  const [clearFilter, setClearFilter] = useState(false);

  const getAllJobs = () => {
    openLoader();
    getAll(filter)
      .then(res => {
        setJobs(res.jobs);
        setCount(Math.ceil(res.count / 10));
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
    getAllJobs();
  }, [filter]);

  const handlePage = (event = null, value = 1) => {
    setFilter({ ...filter, pageNo: value, pageSize: 10 });
  };
  const handleSubmit = values => {
    setFilter({ ...filter, pageSize: -1, ...values });
    setClearFilter(true);
  };

  return (
    <Container maxWidth='md'>
      <h1 className='mt-20'>Find Work</h1>
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
      <Box sx={style.jobsContainer}>
        <h2>Latest Jobs</h2>
        <Box>
          {jobs.map((job, index) => {
            return <JobPostCard sx={style.jobCard} job={job} key={index} />;
          })}
        </Box>
        {jobs.length ? (
          <></>
        ) : (
          <Box className='center-row'>
            {' '}
            <img src='/no-data.png' width={500} />{' '}
          </Box>
        )}
      </Box>
      <Box className='pb-30 d-flex justify-end'>
        <Pagination count={count} page={filter.pageNo} onChange={handlePage} color='primary' />
      </Box>
    </Container>
  );
};

const style = {
  categoryDrop: {
    width: 400,
    mx: 2
  },
  jobsContainer: {
    backgroundColor: 'lightGrey.main',
    p: 2,
    my: 2,
    borderRadius: 5
  },
  jobCard: {
    my: 2
  }
};
