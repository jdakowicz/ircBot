var fs = require('fs');

var fileName = 'users.json';
var users = JSON.parse(fs.readFileSync(fileName)) || [];

function saveFile(data) {
    fs.writeFile(fileName, data, write);
}
function write(err) {
    if (err) {
        throw err;
    } else {
        console.log('file Saved');
    }
};
function getBannedUsers() {
    var banned = [];
    users.forEach(function (user) {
        if (user.banned) {
            banned.push(user);
        }
    });
    return banned;
};
function findUser(nickname) {
    users.forEach(function (user) {
        if (user.nickname === nickname) {
            return user;
        }
    });
    return false;
};

function update() {
    saveFile(JSON.stringify(users));
}

console.log('users:', users);
