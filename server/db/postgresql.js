const pg = require('pg');

const config = {
    host: '106.240.247.42',
    port: '5432',
    user: 'genie',
    password: 'genie01',
    database: 'yayspp'
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