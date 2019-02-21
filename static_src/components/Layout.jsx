import React from 'react';
import PropTypes from 'prop-types';
import ChatList from './ChatList';
import '../style/layout.sass';
import MessageField from './MessageField';

export default class Layout extends React.Component {
    static propTypes = {
        chatId: PropTypes.string,
    };

    static defaultProps = {
        chatId: '1'
    };

    render() {
        return (
            <div className={'layout'}>
                <div className={'layout-left-side'}>
                    <ChatList chatId={this.props.chatId}/>
                </div>
                <div className={'layout-right-side'}>
                    <MessageField chatId={this.props.chatId}/>
                </div>
            </div>
        )
    }
}