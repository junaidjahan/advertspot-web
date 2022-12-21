import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authState, userState } from '~/state';
import { useAxios } from '../use-axios';

export const useChat = () => {
    const { post, get } = useAxios();

    const user = useRecoilValue(userState);

    const saveMessage = async m => {
        {
            try {
                await post('/message', m);
            } catch { }
        }
    };

    const getOrCreateConversation = async id => {
        const data = {
            people:[id]
        }
        {
            try {
                const conversation = await post(`/conversation/get-conversation`,data);
                return conversation;
            } catch { }
        }
    };

    const getConversation = async () => {
        {
            try {
                const conversations = await get(`conversation/get-conversations`);
                return conversations;
            } catch { }
        }
    };

    const getMessagesByConversationId = async (id) => {
        {
            try {
                const Messages = await get(`/message/${id}`);
                return Messages;
            } catch { }
        }
    };


    return {
        saveMessage,
        getConversation,
        getOrCreateConversation,
        getMessagesByConversationId,
    };
};
