import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authState, userState } from '~/state';
import { useAxios } from '../use-axios';

export const useGig = () => {
  const { post, get } = useAxios();
  const filterType = {
    pageNo: 1,
    pageSize: 12,
    title: '',
    category: ''
  };

  const user = useRecoilValue(userState);

  const saveGig = async gigData => {
    {
      try {
        await post('/gig', gigData);
      } catch {}
    }
  };

  const getGigById = async id => {
    {
      try {
        const gig = await get(`/gig/get-by-id/${id}`);
        return gig;
      } catch {}
    }
  };

  const getAll = async filter => {
    {
      try {
        const allGigs = await get(`/gig?filter=${JSON.stringify(filter)}`);
        return allGigs;
      } catch {}
    }
  };

  // const getById = async ()=>{
  //     return
  // }

  return {
    saveGig,
    getAll,
    getGigById,
    filterType
  };
};
