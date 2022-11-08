import { useRecoilState } from 'recoil';
import { loaderState } from '~/state';

export const useLoader = () => {
  const [loader, setLoader] = useRecoilState(loaderState);

  const openLoader = () => {
    setLoader({
      open: true
    });
  };

  const closeLoader = () => {
    setLoader({
      open: false
    });
  };

  return {
    loader,
    openLoader,
    closeLoader
  };
};
