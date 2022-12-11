import { Box, Container, Pagination } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BackPage, BaseButton, BaseForm, BaseSelect, BaseTextField, JobPostCard, ProposalCard } from '~/components';
import { useForm, useJob, useProposal, useSnackbar } from '~/hooks';
import { useLoader } from '~/hooks/use-loader';

export const AllProposals = () => {
  const { getAll, filterType } = useJob();
  const { getAllProposals } = useProposal();
  const [proposal, setProposal] = useState([]);
  const [filter, setFilter] = useState(filterType);
  const { openLoader, closeLoader } = useLoader();
  let { id } = useParams();

  const getAllProp = () => {
    openLoader();
    getAllProposals(id)
      .then(res => {
        setProposal(res);
      })
      .finally(() => {
        closeLoader();
      });
  };

  useEffect(() => {
    getAllProp();
  }, [id]);

  return (
    <Container maxWidth='md'>
      <BackPage />
      <h1 className='mt-20'>All Proposals</h1>

      <Box sx={style.jobsContainer}>
        <h2>Latest Proposals</h2>
        <Box>
          {proposal?.map((job, index) => {
            return <ProposalCard data={job} key={index} />;
          })}
        </Box>
        {proposal.length ? (
          <></>
        ) : (
          <Box className='center-row'>
            {' '}
            <img src='/no-data.png' width={500} />{' '}
          </Box>
        )}
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
