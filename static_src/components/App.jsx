import React from 'react';
import {Switch, Route} from 'react-router-dom';
import '../style.css';
import Layout from './Layout';
import Profile from "./Profile";


export default class App extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path='/' component={Layout}/>
                <Route exact path='/chat/profile/' component={Profile}/>
                <Route exact path='/chat/:chatId/' render={obj => <Layout chatId={obj.match.params.chatId}/>}/>
            </Switch>
        )
    }
}