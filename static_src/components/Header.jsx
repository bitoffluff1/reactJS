import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';


class Header extends React.Component {
    static propTypes = {
        messageCount: PropTypes.number
    };

    static defaultProps = {
        messageCount: 10
    };

    render() {
        return (<div className='header'>{this.props.messageCount}</div>)
    }
}

const mapStateToProps = ({messageReducer}) => ({
    messageCount: Object.keys(messageReducer.messages).length
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Header);