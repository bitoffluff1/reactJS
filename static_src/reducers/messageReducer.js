import update from 'react-addons-update';
import {
    SEND_MESSAGE, REPLY_MESSAGE, ADD_CHAT,
    HIGHLIGHT, UNHIGHLIGHT,
    START_CHATS_LOADING, SUCCESS_CHATS_LOADING, ERROR_CHATS_LOADING,
    START_PROFILE_LOADING, SUCCESS_PROFILE_LOADING, ERROR_PROFILE_LOADING
} from '../actions/messageActions';

const initialStore = {
    curId: 1,
    chats: {},
    messages: {},
    highlightedChat: undefined,
    isLoading: true,
    isLoadingP: true,
    profile: {}
};

export default function messageReducer(store = initialStore, action) {
    switch (action.type) {
        case START_CHATS_LOADING: {
            return update(store, {
                isLoading: {$set: true}
            });
        }

        case SUCCESS_CHATS_LOADING: {
            //console.log(action.payload);
            return update(store, {
                chats: {$set: action.payload.entities.chats},
                messages: {$set: action.payload.entities.messages},
                curId: {$set: Object.keys(action.payload.entities.messages).length + 1},
                isLoading: {$set: false},
            });
        }

        case ERROR_CHATS_LOADING: {
            return update(store, {
                isLoading: {$set: false},
            });
        }

         case START_PROFILE_LOADING: {
            return update(store, {
                isLoadingP: {$set: true}
            });
        }

        case SUCCESS_PROFILE_LOADING: {
            //console.log(action.payload);
            return update(store, {
                profile: {$set: action.payload.entities.profile},
                isLoadingP: {$set: false},
            });
        }

        case ERROR_PROFILE_LOADING: {
            return update(store, {
                isLoadingP: {$set: false},
            });
        }

        case SEND_MESSAGE: {
            const {chatId, message} = action;
            const {chats, curId, messages} = store;

            const chat = chats[chatId];
            chat.messages.push(curId);

            const newMessages = {
                ...messages,
                [curId]: {
                    'id': curId,
                    sender: 'me',
                    message
                },
            };
            return update(store, {
                curId: {$set: curId + 1},
                messages: {$set: newMessages},
                chats: {$merge: {[chatId]: chat}}
            });
        }

        case REPLY_MESSAGE: {
            const {chatId} = action;
            const {chats, curId, messages} = store;

            const chat = chats[chatId];
            chat.messages.push(curId);

            const newMessages = {
                ...messages,
                [curId]: {
                    'id': curId,
                    sender: 'bot',
                    message: 'Что нужно?'
                }
            };

            return update(store, {
                curId: {$set: curId + 1},
                messages: {$set: newMessages}
            });
        }

        case HIGHLIGHT: {
            return update(store, {
                highlightedChat: {$set: action.chatId},
            });
        }
        case UNHIGHLIGHT: {
            return update(store, {
                highlightedChat: {$set: undefined},
            });
        }

        case ADD_CHAT: {
            const {nameChat} = action;

            if (nameChat === '') {
                const newChatNumber = Object.keys(store.chats).length + 1;
                const newChat = {
                    ...store.chats,
                    [newChatNumber]: {'id': [newChatNumber], 'name': `Chat ${newChatNumber}`, 'messages': []}
                };
                return update(store, {
                    chats: {$set: newChat},
                })

            } else {
                const newChatNumber = Object.keys(store.chats).length + 1;
                const newChat = {
                    ...store.chats,
                    [newChatNumber]: {'id': [newChatNumber], 'name': `${nameChat}`, 'messages': []}
                };
                return update(store, {
                    chats: {$set: newChat},
                })
            }
        }

        default:
            return store;
    }
}