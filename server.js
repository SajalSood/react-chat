const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const { v4: uuidv4} = require('uuid');
const chat = require('./chat-info');

const PORT = 4000;

app.use(express.static('./build'));
app.use(cookieParser());

app.get('/session', (req,res) => {
    const uId = req.cookies.uid;
    if(!uId){
        res.sendStatus(403);
        return;
    }
    if(uId && !chat.users[uId]){
		res.clearCookie('uid');
        res.sendStatus(403);
        return;
	}
	res.status(200).json(chat.users[uId]);
});

app.post('/session', express.json(), (req,res) => {
    const name = req.body.name;
    if(!name || name.toLowerCase().includes("dog")){
		res.status(401).json({error: 'Enter a valid name'});
		return;
    }
    if(!name.match(/^[A-Za-z0-9_-]{2,26}$/)){
        res.status(401).json({ error: 'Name contains invalid characters'});
        return;
    }

    let uId = chat.userExists(name);
    if(uId) {
        chat.updateUser(uId);
    }
    else {
        uId = uuidv4();
        chat.addUser({ name, active: true, uId});
    }
    res.cookie('uid', uId);
    res.json(chat.users[uId]);
});

app.delete('/session', (req, res) =>{
    uId = req.cookies.uid;
    res.clearCookie('uid');
    chat.removeUser(uId);
    res.sendStatus(200);
    return;
});

app.get('/users', (req,res) =>{
    const uId = req.cookies.uid;
	if(!uId){
		res.status(401).json({error: 'Unauthorized user'});
		return;
	}
	if(uId && !chat.users[uId]){
		res.status(403).json({error: 'User not allowed' });
		return;
	}
    res.json(chat.users);
});

app.get('/messages', (req,res) =>{
    const uId = req.cookies.uid;
	if(!uId){
		res.status(401).json({error: 'Unauthorized user'});
		return;
	}
	if(uId && !chat.users[uId]){
		res.status(403).json({error: 'User not allowed' });
		return;
	}
    res.json(chat.getMessages());
});

app.post('/messages', express.json(), (req,res) =>{
    const message = req.body.message;
    uId = req.cookies.uid;
    if(!uId){
        res.status(401).json({error: 'Unauthorized user'});
		return;
	}
	if(uId && !chat.users[uId]){
		res.status(403).json({error: 'User not allowed' });
		return;
	}
	if(!message || message.trim().length == 0 ) {
		res.status(400).json({ error: 'Message not entered'});
		return;
    }
    const timestamp = new Date().toLocaleTimeString();
    chat.addMessage({uId, timestamp, message});
    res.json(chat.getMessages());
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));