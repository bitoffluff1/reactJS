import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';


export default class Layout extends React.Component {
    static propTypes = {
        chatId: PropTypes.string.isRequired,
    };

    render() {
        return (
            <List>
                <Link to='/chat/1/'><ListItem primaryText='Inbox' leftIcon={<ContentInbox/>}/></Link>
                <Link to='/chat/2/'><ListItem primaryText='Starred' leftIcon={<ActionGrade/>}/></Link>
                <Link to='/chat/3/'><ListItem primaryText='Sent mail' leftIcon={<ContentSend/>}/></Link>
                <Link to='/chat/4/'><ListItem primaryText='Drafts' leftIcon={<ContentDrafts/>}/></Link>
                <Link to='/chat/5/'><ListItem primaryText='Inbox' leftIcon={<ContentInbox/>}/></Link>
            </List>
        )
    }
}