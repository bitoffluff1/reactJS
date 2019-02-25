import update from 'react-addons-update';
import {SEND_MESSAGE, REPLY_MESSAGE} from '../actions/messageActions';

const initialStore = {
    curId: 1,
    messageLists: {1: [], 2: [], 3: [], 4: [], 5: []},
    messages: {}
};


export default function messageReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MESSAGE: {
            const {chatId, message} = action;
            const {messages, curId, messageLists} = store;

            const newMessageList = [...messageLists[chatId], curId];
            const newMessageLists = {...messageLists, [chatId]: newMessageList};

            const newMessages = {
                ...messages,
                [curId]: {
                    sender: 'me',
                    message,
                    chatId
                }
            };

            return update(store, {
                curId: {$set: curId + 1},
                messageLists: {$set: newMessageLists},
                messages: {$set: newMessages}
            });
        }

        case REPLY_MESSAGE: {
            const {chatId} = action;
            const {messages, curId, messageLists} = store;

            const newMessageList = [...messageLists[chatId], curId];
            const newMessageLists = {...messageLists, [chatId]: newMessageList};

            const newMessages = {
                ...messages,
                [curId]: {
                    sender: 'bot',
                    message: 'Что нужно?',
                    chatId
                }
            };

            return update(store, {
                curId: {$set: curId + 1},
                messageLists: {$set: newMessageLists},
                messages: {$set: newMessages}
            });
        }

        default:
            return store;
    }
}