import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {teal50} from 'material-ui/styles/colors';
import {addChat, loadChats} from "../actions/messageActions";
import '../style/layout.sass';


class ChatList extends React.Component {
    static propTypes = {
        chatId: PropTypes.string.isRequired,
        push: PropTypes.func.isRequired,
        chats: PropTypes.object.isRequired,
        addChat: PropTypes.func.isRequired,
        highlightedChat: PropTypes.string,
        loadChats: PropTypes.func.isRequired
    };

    state = {
        nameChat: ''
    };

    componentDidMount() {
        this.props.loadChats();
    }

    handleInput = (e) => {
        this.setState({nameChat: e.target.value})
    };

    handleChangeChat = (chatId) => {
        this.props.push(`/chat/${chatId}/`);
    };

    handleAddChat = () => {
        this.props.addChat(this.state.nameChat);
        this.setState({nameChat: ''});
    };

    highlightedChat = (chatNumber) => {
        if (this.props.highlightedChat !== undefined && this.props.highlightedChat !== this.props.chatId) {
            if (this.props.highlightedChat === chatNumber) {
                return 'newMassage';
            }
        }
        if (this.props.chatId === chatNumber) {
            return 'active';
        } else {
            return '';
        }
    };

    render() {
        const {chats} = this.props;
        const chatLinks = Object.keys(chats).map(
            (chatNumber, i) =>
                <ListItem
                    key={i}
                    style={{color: teal50}}
                    className={this.highlightedChat(chatNumber)}
                    primaryText={`${chats[chatNumber].name}`}
                    leftIcon={<ContentInbox color={teal50}/>}
                    rightIcon={<div className='messageCountInChat'>{chats[chatNumber].messages.length}</div>}
                    onClick={() => this.handleChangeChat(chatNumber)}
                />
        );

        return (
            <List className='chatList'>
                {chatLinks}
                <input
                    className='chatList_input'
                    placeholder='Введите название нового чата'
                    name='nameChat'
                    value={this.state.nameChat}
                    onChange={this.handleInput}/>
                <ListItem
                    style={{color: teal50}}
                    primaryText='Добавить новый чат'
                    leftIcon={<ContentAdd color={teal50}/>}
                    onClick={this.handleAddChat}
                />
            </List>
        )
    }
}

const mapStateToProps = ({messageReducer}) => ({
    chats: messageReducer.chats,
    highlightedChat: messageReducer.highlightedChat
});
const mapDispatchToProps = dispatch => bindActionCreators({push, addChat, loadChats}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
