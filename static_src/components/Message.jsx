import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
import {teal100, lightBlue100} from 'material-ui/styles/colors';


const styles = {
    me: {
        alignSelf: 'flex-start',
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 2
    },
    bot: {
        alignSelf: 'flex-end',
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 2
    }
};


export default class Message extends React.Component {
    static propTypes = {
        message: PropTypes.string.isRequired,
        sender: PropTypes.string.isRequired,
    };

    render() {
        return (
            <Chip
                style={this.props.sender === 'me' ? styles.me : styles.bot}
                backgroundColor={this.props.sender === 'me' ? teal100 : lightBlue100}
            >{this.props.message}</Chip>)
    }
}