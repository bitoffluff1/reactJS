import { CALL_API, getJSON } from 'redux-api-middleware';
import { normalize } from 'normalizr';
import { chats } from '../utils/schemas';
import { profile } from '../utils/schemas';

export const SEND_MESSAGE = '@@message/SEND_MESSAGE';

export const sendMessage = (chatId, message) => ({
    type: SEND_MESSAGE,
    chatId,
    message
});

export const REPLY_MESSAGE = '@@message/REPLY_MESSAGE';

export const replayMessage = (chatId) => ({
    type: REPLY_MESSAGE,
    chatId
});

export const ADD_CHAT = '@@message/ADD_CHAT';

export const addChat = (nameChat, chatId) => ({
    type: ADD_CHAT,
    nameChat,
    chatId
});

export const HIGHLIGHT = '@@message/HIGHLIGHT';

export const highlight = (chatId) => ({
    type: HIGHLIGHT,
    chatId
});

export const UNHIGHLIGHT = '@@message/UNHIGHLIGHT';

export const unhighlight = (chatId) => ({
    type: UNHIGHLIGHT,
    chatId
});

export const START_CHATS_LOADING = '@@message/START_CHATS_LOADING';
export const SUCCESS_CHATS_LOADING = '@@message/SUCCESS_CHATS_LOADING';
export const ERROR_CHATS_LOADING = '@@message/ERROR_CHATS_LOADING';

export const loadChats = () => ({
    [CALL_API]: {
        credentials: 'include',
        endpoint: '/api/chats/',
        method: 'GET',
        types: [
            START_CHATS_LOADING,
            {
                type: SUCCESS_CHATS_LOADING,
                payload: (action, state, res) => getJSON(res).then(
                    json => normalize(json, [chats]),
                ),
            },
            ERROR_CHATS_LOADING,
        ],
    },
});

export const START_PROFILE_LOADING = '@@message/START_PROFILE_LOADING';
export const SUCCESS_PROFILE_LOADING = '@@message/SUCCESS_PROFILE_LOADING';
export const ERROR_PROFILE_LOADING = '@@message/ERROR_PROFILE_LOADING';

export const loadProfile = () => ({
    [CALL_API]: {
        credentials: 'include',
        endpoint: '/api/profile/',
        method: 'GET',
        types: [
            START_PROFILE_LOADING,
            {
                type: SUCCESS_PROFILE_LOADING,
                payload: (action, state, res) => getJSON(res).then(
                    json => normalize(json, [profile]),
                ),
            },
            ERROR_PROFILE_LOADING,
        ],
    },
});

