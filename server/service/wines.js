const db = require('../db/postgresql');
const Wines = (() => {
    let _self;
    function Wines() {
        _self = this;
    }

    Wines.prototype.findById = (req, res) => {
        console.log('Wines.prototype.findById');

        const sql = `SELECT * FROM {DB}`;
        db.query(sql, (err, result) => {
            if (!err) res.send(result);
        });
    }

    Wines.prototype.findAll = (req, res) => {
        let id = req.params.id;
        console.log('Wines.prototype.findAll, params : ', req.params);

        const sql = `SELECT * FROM {DB} WHERE ID = '${id}'`;
        db.query(sql, (err, result) => {
            if (!err) res.send(result);
        });
    }

    Wines.prototype.insert = (req, res) => {
        console.log('Wines.prototype.insert');

        const sql = `INSERT INTO {DB}{COLUMN} VALUES ({VALUES})`;
        db.query(sql, (err, result) => {
            if (!err) res.send(result);
        });
    }

    Wines.prototype.update = (req, res) => {
        let id = req.params.id;
        console.log('Wines.prototype.update, params : ', req.params);

        const sql = `UPDATE {DB} SET {COLUMN} = ? WHERE ID = '${id}'`;
        db.query(sql, (err, result) => {
            if (!err) res.send(result);
        });
    }

    Wines.prototype.delete = (req, res) => {
        let id = req.params.id;
        console.log('Wines.prototype.delete, params : ', req.params);

        const sql = `DELETE FROM {DB} WHERE ID = '${id}'`;
        db.query(sql, (err, result) => {
            if (!err) res.send(result);
        });
    }

    return new Wines;
})();

module.exports = Wines;