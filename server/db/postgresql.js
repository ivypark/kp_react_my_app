const pg = require('pg');

const config = {
    host: '',
    port: '5432',
    user: 'genie',
    password: 'genie01',
    database: '?'
}

const db = new pg.Pool(config);

function query(sql, values, callback) {
    return db.query(sql, values, callback);
}

function connect(callback) {
    return db.connect(callback);
}

module.exports = {
    query,
    connect
}