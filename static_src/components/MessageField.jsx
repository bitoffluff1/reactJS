import React from "react";
import Message from "./Message";

export default class MessageField extends React.Component {
    state = {
        curId: 1,
        messageList: [],
        messages: {},
        input: "",
    };

    componentDidUpdate(prevProps, prevState) {
        const lastMessageId = this.state.messageList[this.state.messageList.length - 1];
        const lastMessageSender = this.state.messages[lastMessageId] ? this.state.messages[lastMessageId].sender : "";
        if (prevState.messageList.length < this.state.messageList.length && lastMessageSender === "me") {
            this.handleReplyMessage();
        }
    }

    handleSendMessage = () => {
        const messageList = this.state.messageList.slice();
        messageList.push(this.state.curId);

        const messages = this.state.messages;
        messages[this.state.curId] = {sender: "me", message: this.state.input};

        this.setState({messageList, messages, input: "", curId: this.state.curId + 1});
    };

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleReplyMessage = () => {
        const messageList = this.state.messageList.slice();
        messageList.push(this.state.curId);
        const messages = this.state.messages;
        messages[this.state.curId] = {sender: "bot", message: "Что вам нужно?"};
        setTimeout(() => this.setState({messageList, messages, input: "", curId: this.state.curId + 1}), 2000);
    };

    render() {
        const messages = this.state.messageList.map((messageId, index) =>
            <Message
                key={`${messageId} ${index}`}
                message={this.state.messages[messageId].message}
            />
            );

        return (
            <div>
                {this.state.messages.length === 0 &&
                <div style={{opacity: 0.5}}>Пока нет ни одного сообщения</div>}
                {messages}
                <input name="input" value={this.state.input} onChange={this.handleInput}/>
                <button onClick={this.handleSendMessage}>Отправить сообщение</button>
            </div>
        )
    };
}