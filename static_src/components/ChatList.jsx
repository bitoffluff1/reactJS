import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import {teal50} from 'material-ui/styles/colors';
import '../style/layout.sass';


class ChatList extends React.Component {
    static propTypes = {
        chatId: PropTypes.string.isRequired,
        messageCountInChat: PropTypes.object.isRequired
    };


    render() {
        return (
            <List>
                <Link to='/chat/1/'>
                    <ListItem
                        style={{color: teal50}}
                        className={this.props.chatId === '1' ? 'active' : ''}
                        primaryText='Chat-1'
                        leftIcon={<ContentInbox color={teal50}/>}
                        rightIcon={<div className='messageCountInChat'>{this.props.messageCountInChat[1].length}</div>}
                    />
                </Link>
                <Link to='/chat/2/'>
                    <ListItem
                        style={{color: teal50}}
                        className={this.props.chatId === '2' ? 'active' : ''}
                        primaryText='Chat-2'
                        leftIcon={<ActionGrade color={teal50}/>}
                        rightIcon={<div className='messageCountInChat'>{this.props.messageCountInChat[2].length}</div>}
                    />
                </Link>
                <Link to='/chat/3/'>
                    <ListItem
                        style={{color: teal50}}
                        className={this.props.chatId === '3' ? 'active' : ''}
                        primaryText='Chat-3'
                        leftIcon={<ContentSend color={teal50}/>}
                        rightIcon={<div className='messageCountInChat'>{this.props.messageCountInChat[3].length}</div>}
                    />
                </Link>
                <Link to='/chat/4/'>
                    <ListItem
                        style={{color: teal50}}
                        className={this.props.chatId === '4' ? 'active' : ''}
                        primaryText='Chat-4'
                        leftIcon={<ContentDrafts color={teal50}/>}
                        rightIcon={<div className='messageCountInChat'>{this.props.messageCountInChat[4].length}</div>}
                    />
                </Link>
                <Link to='/chat/5/'>
                    <ListItem
                        style={{color: teal50}}
                        className={this.props.chatId === '5' ? 'active' : ''}
                        primaryText='Chat-5'
                        leftIcon={<ContentInbox color={teal50}/>}
                        rightIcon={<div className='messageCountInChat'>{this.props.messageCountInChat[5].length}</div>}
                    />
                </Link>
            </List>
        )
    }
}

const mapStateToProps = ({messageReducer}) => ({
    messageCountInChat: messageReducer.messageLists
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
