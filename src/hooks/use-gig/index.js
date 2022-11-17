import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authState, userState } from '~/state';
import { useAxios } from '../use-axios';

export const useGig = () => {
    const { post } = useAxios();
    const navigate = useNavigate();

    const setAuth = useSetRecoilState(authState);
    const user = useRecoilValue(userState);

    const saveGig = async gigData => {
        {
            try {
                // await post('/gig', gigData);
                console.log(gigData);
            } catch { }
        }
    };

    return {
        saveGig
    };
};
