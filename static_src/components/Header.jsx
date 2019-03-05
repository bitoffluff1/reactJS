import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';


class Header extends React.Component {
    static propTypes = {
        messageCount: PropTypes.number,
    };

    render() {
        return (
            <div className='header'>
                <a href='/chat/profile/' className='header-profile'>Профиль Хмельниковой Елены</a>
                <p className='header-text'>Общее количество сообщений в мессенджере: {this.props.messageCount}</p>
            </div>)
    }
}

const mapStateToProps = ({messageReducer}) => ({
    messageCount: Object.keys(messageReducer.messages).length
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Header);