const sessionIDToUserMap = new Map();

function setUser(id, user){
    sessionIDToUserMap.set(id, user);
}

function getUser(id){
    return sessionIDToUserMap.get(id);
}

function removeUser(id) {
    sessionIDToUserMap.delete(id);
}

module.exports = {
    setUser,
    getUser,
    removeUser,
}