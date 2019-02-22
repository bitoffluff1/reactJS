import React from 'react';
import {Switch, Route} from 'react-router-dom';
import '../style.css';
import Layout from './Layout';


export default class App extends React.Component {
    componentDidMount() {
        console.log('Это работает');
    }

    render() {
        return (
            <Switch>
                <Route exact path='/' component={Layout}/>
                <Route exact path='/chat/:chatId/' render={obj => <Layout chatId={obj.match.params.chatId}/>}/>
            </Switch>
        )
    }
}