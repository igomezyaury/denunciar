const { database } = require('./index').common;

console.log(database);

module.exports = { ...database };
