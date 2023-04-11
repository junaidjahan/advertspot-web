import { useAxios } from '../use-axios';
import { useSnackbar } from '../use-snackbar';

export const useOrder = () => {
  const { post, get } = useAxios();
  const { open } = useSnackbar();

  const saveOrder = async orderData => {
    {
      try {
        return await post('/order', orderData);
      } catch {}
    }
  };

  //   const getAllProposals = async id => {
  //     {
  //       try {
  //         const proposals = await get(`/proposal/proposals-by-id/${id}`);
  //         return proposals;
  //       } catch {}
  //     }
  //   };

  return {
    saveOrder
  };
};
