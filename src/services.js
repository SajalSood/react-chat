export const fetchLoginStatus = () =>{
    return fetch('/session',{
        method:'GET',
      })
      .catch((err) => Promise.reject({ error: 'Network Error' }))
      .then((res) =>{
        if(!res.ok){
          return Promise.reject({ error: 'Invalid Login' });
        }
        return;
    });
}

export const fetchLogin = (name) =>{
    return fetch('/session',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
    })
    .catch(() => Promise.reject({ error: 'Network Error'}))
    .then((res) => {
        if(!res.ok){
            return res.json().then(err => Promise.reject(err));
        }
        return res.json();
    });
}

export const fetchMessage = (message) =>{
    return fetch('/messages',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ message }),
    })
    .catch(() => Promise.reject({ error: 'Network Error'}))
    .then((res) => {
        if(!res.ok){
            return res.json().then(err => Promise.reject(err));
        }
        return res.json();
    });
}

export const fetchLogout = () => {
    return fetch('/session', {
        method: 'DELETE',
    })
    .catch(() => Promise.reject({ error: 'Network Error'}))
    .then((res) => {
        if(!res.ok){
            return Promise.reject({ error: 'Error logging out the user'})
        }
        return;
    });
}

export const fetchUsers = () =>{
    return fetch('/users', {
        method: 'GET',
    })
    .catch(() => Promise.reject( {error: 'Network Error'}))
    .then((res) => {
        if(!res.ok){
            return res.json().then(err => Promise.reject(err));
        }
        return res.json();
    });
}

export const fetchMessages = () =>{
    return fetch('/messages', {
        method: 'GET',
    })
    .catch(() => Promise.reject( {error: 'Network Error'}))
    .then((res) => {
        if(!res.ok){
            return res.json().then(err => Promise.reject(err));
        }
        return res.json();
    });
}