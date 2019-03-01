import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {teal50} from 'material-ui/styles/colors';
import {addChat} from "../actions/messageActions";
import '../style/layout.sass';


class ChatList extends React.Component {
    static propTypes = {
        chatId: PropTypes.string.isRequired,
        messageCountInChat: PropTypes.object.isRequired,
        push: PropTypes.func.isRequired,
        chatList: PropTypes.object.isRequired,
        addChat: PropTypes.func.isRequired
    };

    handleChangeChat = (chatId) => {
        this.props.push(`/chat/${chatId}/`);
    };
    handleAddChat = () => {
        this.props.addChat();
    };


    render() {
        const {messageCountInChat, chatList} = this.props;
        const chatLinks = Object.keys(chatList).map(
            (chatNumber) =>
                <ListItem
                    style={{color: teal50}}
                    className={this.props.chatId === chatNumber ? 'active' : ''}
                    primaryText={`${chatList[chatNumber]}`}
                    leftIcon={<ContentInbox color={teal50}/>}
                    rightIcon={<div className='messageCountInChat'>{messageCountInChat[chatNumber].length}</div>}
                    onClick={() => this.handleChangeChat(chatNumber)}
                />
        );


        return (
            <List>
                {chatLinks}
                <ListItem
                    style={{color: teal50}}
                    //className={this.props.chatId === chatNumber ? 'active' : ''}
                    primaryText='Добавить новый чат'
                    leftIcon={<ContentAdd color={teal50}/>}
                    //rightIcon={<div className='messageCountInChat'>{messageCountInChat[chatNumber].length}</div>}
                    onClick={this.handleAddChat}
                />
            </List>
        )
    }
}

const mapStateToProps = ({messageReducer}) => ({
    messageCountInChat: messageReducer.messageLists,
    chatList: messageReducer.chatList
});
const mapDispatchToProps = dispatch => bindActionCreators({push, addChat}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
