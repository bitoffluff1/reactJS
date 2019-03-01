import {LOCATION_CHANGE} from 'react-router-redux';
import {SEND_MESSAGE, replayMessage, REPLY_MESSAGE} from "../actions/messageActions";


export default store => next => (action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            setTimeout(() => store.dispatch(replayMessage(action.chatId)), 2000);
            break;
        case REPLY_MESSAGE:
            console.log('отправилось');
            break;
        case LOCATION_CHANGE:
            console.log('1');
            break;
        default:
            break;
    }
    return next(action);
}