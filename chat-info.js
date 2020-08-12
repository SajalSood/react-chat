const users = {
    "facc5d3f-38e8-4f3b-a720-6603c8601592" : {
        name: "Admin",
        active: true, 
        uId: "facc5d3f-38e8-4f3b-a720-6603c8601592"
    }
};
const messages = [{
    user: {
        name: "Admin",
        active: true, 
        uId: "facc5d3f-38e8-4f3b-a720-6603c8601592"
    },
    timestamp: new Date().toLocaleTimeString(),
    message: "Welcome Everyone. This is your message board. Please feel free to chat here."
}];

function userExists(name) {
    const record = Object.values(users).find(user => user.name.toLowerCase() === name.toLowerCase());
    return record && record.uId;
}

function addUser({name, active, uId}) {
    users[uId] = { name, active, uId };
    return uId;
}

function updateUser(uId) {
    users[uId].active = true;
}

function removeUser(uId) {
    if(users[uId]) {
        users[uId].active = false;
    }
}

function addMessage({ uId, timestamp, message }) {
    messages.push({ user: chat.users[uId], timestamp, message });
}

function getMessages() {
   return messages.sort(function(msg1, msg2) {
        return (msg1.timestamp > msg2.timestamp) ? -1 : 1;
    });
}

const chat = {
    users,
    messages,
    userExists,
    addUser,
    updateUser,
    removeUser,
    getMessages,
    addMessage
};

module.exports = chat;