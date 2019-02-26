import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import Message from './Message';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SendIcon from 'material-ui/svg-icons/content/send';
import {sendMessage, replayMessage} from '../actions/messageActions';
import '../style/messages.sass';

class MessageField extends React.Component {
    static propTypes = {
        chatId: PropTypes.string.isRequired,
        sendMessage: PropTypes.func.isRequired,
        replayMessage: PropTypes.func.isRequired,
        messageLists: PropTypes.object.isRequired,
        messages: PropTypes.object.isRequired
    };

    state = {
        input: ''
    };

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    handleSendMessage = () => {
        this.props.sendMessage(this.props.chatId, this.state.input);
        this.setState({input: ''});
    };

//после того как отработала функция рендер
    componentDidUpdate(prevProps) {
        const {chatId, messageLists, messages} = this.props;

        const messageList = messageLists[chatId];
        const lastMessageId = messageList[messageList.length - 1];
        const lastMessageSender = messages[lastMessageId] ?
            messages[lastMessageId].sender : '';

        if (prevProps.messageLists[chatId].length < messageList.length && lastMessageSender === 'me') {
            setTimeout(() => this.handleReplyMessage(), 2000);
        }
    };

    handleReplyMessage = () => {
        this.props.replayMessage(this.props.chatId);
    };

    render() {
        const {messageLists, messages, chatId} = this.props;
        const messagesComponent = messageLists[chatId].map((item, i) =>
            <Message
                key={`${item}_${i}`}
                sender={messages[item].sender}
                message={messages[item].message}
            />
        );

        return (
            <div className='box'>
                {Object.keys(messages).length === 0 &&
                <div style={{opacity: 0.5}}>Пока нет ни одного сообщения</div>}

                <div className='messages-box'>{messagesComponent}</div>
                <div className='send-box'>
                    <TextField
                        fullWidth={true}
                        hintText='Введите сообщение'
                        name='input'
                        value={this.state.input}
                        onChange={this.handleInput}/>
                    <FloatingActionButton
                        style={{width: 56, marginLeft: 20}}
                        onClick={this.handleSendMessage}
                    >
                        <SendIcon/>
                    </FloatingActionButton>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({messageReducer}) => ({
    messageLists: messageReducer.messageLists,
    messages: messageReducer.messages
});
const mapDispatchToProps = dispatch => bindActionCreators({sendMessage, replayMessage}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MessageField);