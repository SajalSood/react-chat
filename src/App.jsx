import React, {useState, useEffect } from 'react';
import './App.css';
import { fetchLoginStatus } from './services';
import Login from './Login';
import Chat from './Chat';

const App = () => {
  const [userState, setUserState] = useState({ isLoggedIn: false});
  const [error, setError] = useState('');

  useEffect( () => {
    fetchLoginStatus()
    .then((username) =>{
      setUserState({ 
        isLoggedIn: true,
        username,
      })
    })
  }, []);

  const login = (username) =>{
    setUserState({ 
      isLoggedIn: true,
      username
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Welcome To OurChat!</h2>
      </header>
      <section>
        <p className ="info-danger">{ error }</p>

        {
          userState.isLoggedIn && <Chat setUserState={ setUserState } setError={ setError }/> 
        }

        {
          !userState.isLoggedIn && <Login onLogin={ login } setError={ setError }/>  
        }
      </section>
    </div>
  );
}

export default App;
