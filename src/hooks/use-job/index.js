import { useAxios } from '../use-axios';

export const useJob = () => {
  const { post, get } = useAxios();
  const filterType = {
    pageNo: 1,
    pageSize: 10,
    title: '',
    category: ''
  };

  const saveJob = async jobData => {
    {
      try {
        (jobData.Quantity = parseInt(jobData.Quantity)), (jobData.Budget = parseInt(jobData.Budget));
        await post('/job', jobData);
      } catch {}
    }
  };

  const getAll = async filter => {
    {
      try {
        const allJobs = await get(`/job?filter=${JSON.stringify(filter)}`);
        return allJobs;
      } catch {}
    }
  };

  const getAllCities = async () => {
    {
      try {
        const allCities = await get('/job/cities');
        return allCities;
      } catch {}
    }
  };

  return {
    filterType,
    saveJob,
    getAll,
    getAllCities
  };
};
