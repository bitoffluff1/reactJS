import {LOCATION_CHANGE} from 'react-router-redux';
import {SEND_MESSAGE, replayMessage, REPLY_MESSAGE} from "../actions/messageActions";
import {highlight, HIGHLIGHT, unhighlight, UNHIGHLIGHT} from "../actions/messageActions";


export default store => next => (action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            setTimeout(() => store.dispatch(replayMessage(action.chatId)), 2000);
            break;

        case REPLY_MESSAGE:
            setInterval(() => store.dispatch(highlight(action.chatId)), 1000);
            break;

        case HIGHLIGHT:
            setTimeout(() => store.dispatch(unhighlight()), 500);
            break;

        case UNHIGHLIGHT:
            break;

        case LOCATION_CHANGE:
            break;

        default:
            break;
    }
    return next(action);
}