const sqlite3 = require('sqlite3')
const db = new sqlite3.Database(':memory:') // 'memory' allows database to be empty every time we run it

module.exports = db