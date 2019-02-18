import React from 'react';
import "../style.css";
import MessageField from "./MessageField";


export default class app extends React.Component {
    componentDidMount() {
        console.log("Это работает");
    }

    render() {
        return (<MessageField/>)
    }
}