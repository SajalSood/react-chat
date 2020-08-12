import React, { useState, useEffect } from 'react';
import { fetchLogin } from './services';

const Login = ({ onLogin, setError }) => {
    const [username, setUsername] = useState('');

    const doLogin = () =>{
        fetchLogin(username)
        .then(user => {
            onLogin(user);
        })
        .catch((err) =>{
            setError(err.error);
        });
    };

    useEffect(() => {
        setError('');
    }, []);

    return (
        <div className="login">
            <div className="auth">
                <input className="form-control" onChange={ (e) => setUsername(e.target.value)} placeholder="Enter Username Here"/>
                <button className="btn btn-login" onClick={ doLogin }>Login</button>
            </div>
        </div>
    );
};

export default Login;