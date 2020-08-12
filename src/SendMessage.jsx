import React, { useState } from 'react';
import { fetchMessage} from './services';

const SendMessage = ({ onSend, setError, setUserState }) => {
    const [message, setMessage] = useState('');

    const sendMessage = (e) =>{
        fetchMessage(message)
        .then(messages =>{
            onSend(messages);
            setMessage('');
        })
        .catch(err =>{
            setError(err.error);
            if(err.error === 'Unauthorized user' || err.error === 'User not allowed'){
                setUserState({
                    isLoggedIn: false
                });
            }
        })
    }

    const onInput = (e) => {
        setError('');
        setMessage(e.target.value);
    };

    return (
        <div className="message">
            <textarea  rows="5" cols="50" className="form-control text-message" value={ message } onChange={ onInput } placeholder="Enter Message Here" ></textarea>            
            <button className="btn btn-send" onClick={ sendMessage }>Send Message</button>
        </div>
    )
}

export default SendMessage;