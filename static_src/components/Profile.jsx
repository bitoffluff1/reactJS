import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadProfile} from "../actions/messageActions";
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import '../style/profile.sass';

class Profile extends React.Component {
    static propTypes = {
        loadProfile: PropTypes.func.isRequired,
        profile: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.loadProfile();
    }

    render() {
        const {profile} = this.props;
        const profileInfo = Object.keys(profile).map(
            (chatNumber, i) =>
                <Card key={i}>
                    <CardHeader
                        avatar='/static/core/ava.jpg'
                    />
                    <CardTitle title={`${profile[i + 1].firstName} ${profile[i + 1].lastName}`}/>
                    <CardText>
                        Email: {profile[i + 1].email}
                    </CardText>
                </Card>
        );
        return (
            <div className='profileBox'>
                <a href='/'><FlatButton label="<-- Чаты"/></a>
                {profileInfo}
            </div>
        )
    }
}

const mapStateToProps = ({messageReducer}) => ({
    profile: messageReducer.profile
});
const mapDispatchToProps = dispatch => bindActionCreators({loadProfile}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Profile);