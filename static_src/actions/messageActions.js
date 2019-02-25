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