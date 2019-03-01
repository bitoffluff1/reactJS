import update from 'react-addons-update';
import {SEND_MESSAGE, REPLY_MESSAGE, ADD_CHAT} from '../actions/messageActions';

const initialStore = {
    curId: 1,
    chatList: {1: 'Chat 1', 2: 'Chat 2', 3: 'Chat 3', 4: 'Chat 4', 5: 'Chat 5'},
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

        case ADD_CHAT: {
            const newChatNumber = Object.keys(store.chatList).length + 1;
            const newChat = {...store.chatList, [newChatNumber]: `Chat ${newChatNumber}`};
            const newMessageLists = {...store.messageLists, [newChatNumber]: []};

            return update(store, {
                chatList: {$set: newChat},
                messageLists: {$set: newMessageLists}
            })
        }

        default:
            return store;
    }
}