const db = require('../database/config');

function find() {
    return select('id', 'username').from('users');
}

function findByUsername(username) {
    return db.select('id', 'username', 'password').from('users').where('username', username);
}

function add(user) {
    return db.insert(user).into('users');
}

module.exports = {
    find,
    findByUsername,
    add,
}