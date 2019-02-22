import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SendIcon from 'material-ui/svg-icons/content/send';
import '../style/messages.sass';
import Message from './Message';

const style = {
    width: 56,
    marginLeft: 20
};

export default class MessageField extends React.Component {
    static propTypes = {
        chatId: PropTypes.string.isRequired,
    };

    state = {
        curId: 1,
        messageLists: {1: [], 2: [], 3: [], 4: [], 5: []},
        messages: {},
        input: '',
    };

//после того как отработала функция рендер
    componentDidUpdate(prevProps, prevState) {
        const {chatId} = this.props;

        const messageList = this.state.messageLists[chatId];
        const lastMessageId = messageList[messageList.length - 1];
        const lastMessageSender = this.state.messages[lastMessageId] ?
            this.state.messages[lastMessageId].sender : '';

        if (prevState.messageLists[chatId].length < messageList.length && lastMessageSender === 'me') {
            setTimeout(() => this.handleReplyMessage(), 2000);
        }
    };

    handleSendMessage = () => {
        const {chatId} = this.props;
        const {messages, curId, input, messageLists} = this.state;

        const messageList = [...messageLists[chatId], curId];
        const newMessageLists = Object.assign({}, messageLists, {[chatId]: messageList});

        messages[curId] = {
            sender: 'me',
            message: input,
            chatId
        };

        this.setState({
            messageLists: newMessageLists,
            messages,
            input: '',
            curId: curId + 1
        });
    };

    handleReplyMessage = () => {
        const {chatId} = this.props;
        const {messages, curId, messageLists} = this.state;

        const messageList = [...messageLists[chatId], curId];
        const newMessageLists = Object.assign({}, messageLists, {[chatId]: messageList});

        const newMessages = Object.assign({}, messages, {
            [curId]: {
                sender: 'bot',
                message: 'Что нужно?',
                chatId: chatId
            }
        });

        this.setState(
            {
                messageLists: newMessageLists,
                messages: newMessages,
                input: '',
                curId: curId + 1
            });
    };

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    render() {
        const messages = this.state.messageLists[this.props.chatId].map((messageId, index) =>
            <Message
                key={`${messageId}_${index}`}
                sender={this.state.messages[messageId].sender}
                message={this.state.messages[messageId].message}
            />
        );

        return (
            <div className={'box'}>
                {Object.keys(this.state.messages).length === 0 &&
                <div style={{opacity: 0.5}}>Пока нет ни одного сообщения</div>}

                <div className={'messages-box'}>{messages}</div>
                <div className={'send-box'}>
                    <TextField
                        fullWidth={true}
                        hintText={'Введите сообщение'}
                        name='input'
                        value={this.state.input}
                        onChange={this.handleInput}/>
                    <FloatingActionButton style={style} onClick={this.handleSendMessage}>
                        <SendIcon/>
                    </FloatingActionButton>
                </div>
            </div>
        )
    };

}