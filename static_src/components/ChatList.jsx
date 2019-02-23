import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import {teal50} from 'material-ui/styles/colors';
import '../style/layout.sass';


export default class ChatList extends React.Component {
    static propTypes = {
        chatId: PropTypes.string.isRequired,
    };

    click = (e) => {
        if (e.target.className === 'active') {
            e.target.className = '';
        } else {
            e.target.className = 'active';
        }
    };

    render() {
        return (
            <List>
                <Link to='/chat/1/' onClick={this.click}>
                    <ListItem
                        style={{color: teal50}}
                        primaryText='Chat-1'
                        leftIcon={<ContentInbox color={teal50}/>}
                    />
                </Link>
                <Link to='/chat/2/' onClick={this.click}>
                    <ListItem
                        style={{color: teal50}}
                        primaryText='Chat-2'
                        leftIcon={<ActionGrade color={teal50}/>}
                    />
                </Link>
                <Link to='/chat/3/' onClick={this.click}>
                    <ListItem
                        style={{color: teal50}}
                        primaryText='Chat-3'
                        leftIcon={<ContentSend color={teal50}/>}
                    />
                </Link>
                <Link to='/chat/4/' onClick={this.click}>
                    <ListItem
                        style={{color: teal50}}
                        primaryText='Chat-4'
                        leftIcon={<ContentDrafts color={teal50}/>}
                    />
                </Link>
                <Link to='/chat/5/' onClick={this.click}>
                    <ListItem
                        style={{color: teal50}}
                        primaryText='Chat-5'
                        leftIcon={<ContentInbox color={teal50}/>}
                    />
                </Link>
            </List>
        )
    }
}