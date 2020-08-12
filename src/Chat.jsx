import React, { useEffect, useState } from 'react';
import { fetchUsers, fetchMessages} from './services';
import SendMessage from './SendMessage';
import ChatDisplay from './ChatDisplay';
import Logout from './Logout';

const Chat = ({setUserState, setError }) =>{
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);

    const getUsers = () =>{
        fetchUsers()
        .then(users =>{
            setUsers(users);
        })
        .catch(err =>{
            setError(err.error);
        });
    };

    const getMessages = () => {
        fetchMessages()
        .then(messages =>{
            setMessages(messages);
        })
        .catch(err =>{
            setError(err.error);
        });
    };

    const logout = ()=>{
        setUserState({
            isLoggedIn: false
        });
    };

    const send = (messages) =>{
        setMessages(messages);
    };

    useEffect(() => {
        getUsers();
        getMessages();
        setError('');
    }, []);

    return (
        <div className="chat">
            <Logout onLogout={ logout } setError={ setError }/>
            <div className="message-area">
                <SendMessage onSend={ send } setError={ setError } setUserState = {setUserState}/>
            </div> 
            <ChatDisplay users={ users } messages={ messages }/>
        </div>

    )
}

export default Chat;