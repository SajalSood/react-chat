import React from 'react';

const ChatDisplay = ({ users, messages }) =>{

    const userList = Object.values(users).map((user) => 
        <li className="item-group-child" key={user.name.toString()}>
            <span className="user-name">{user.name}</span>
        </li>
    );

    const messageList = Object.values(messages).map((message) =>
        <li className="item-group-child chat-message" key={message.uId + message.timestamp}>
            <div className="item-grid">
                <div className="user-info">
                    <span className="info-success">{message.user.name}</span>
                    <span className="info-danger">{message.timestamp}</span>
                </div>
                <span className="user-message">{message.message}</span>
            </div>
        </li>
    );

    return (
        <div className="chat-area">
            <div>
                <center><b>Users</b></center>
                <ul className="item-group">{ userList }</ul>
            </div>
            <div>
                <center><b>Messages</b></center>
                <ul className="item-group chat-group">{ messageList }</ul>
            </div>
        </div>
    )

}

export default ChatDisplay;