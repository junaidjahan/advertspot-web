import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authState, userState } from '~/state';
import { useAxios } from '../use-axios';

export const useChat = () => {
    const { post, get } = useAxios();

    const user = useRecoilValue(userState);

    const saveMessage = async gigData => {
        {
            try {
                await post('/save-message', gigData);
            } catch { }
        }
    };

    const getConversationById = async id => {
        {
            try {
                const conversation = await get(`/conversation-by-id/${id}`);
                return conversation;
            } catch { }
        }
    };

    const getConversations = async () => {
        {
            try {
                const conversations = await get(`/conversations/${id}`);
                return conversations;
            } catch { }
        }
    };

    // const getById = async ()=>{
    //     return
    // }

    return {
        saveMessage,
        getConversations,
        getConversationById,
    };
};
