const db = require('../db/postgresql');
const Wines = (() => {
    let _self;
    function Wines() {
        _self = this;
    }

    Wines.prototype.findById = (req, res) => {
        let id = req.params.id;
        console.log('## Wines.prototype.findById, params :', req.params);

        const sql = `SELECT * FROM wine.wine WHERE seq = ${id}`;
        db.query(sql, (err, result) => {
            console.log('wine db result : ', result);
            if (!err) res.send(result);
        });
    };

    Wines.prototype.findAll = (req, res) => {
        console.log('## Wines.prototype.findAll');

        const sql = `SELECT * FROM wine.wine`;
        db.query(sql, (err, result) => {
            console.log('wine db result : ', result);
            if (!err) res.send(result.rows);
        });
    };

    Wines.prototype.insertWine = (req, res) => {
        console.log('## Wines.prototype.insert');

        const sql = `INSERT INTO wine.wine(seq, name) VALUES ((SELECT MAX(seq) FROM wine.wine) + 1, 'wine4')`;
        db.query(sql, (err, result) => {
            console.log('wine db result : ', result);
            if (!err) res.send('inserted was successful');
        });
    };

    Wines.prototype.updateWine = (req, res) => {
        let id = req.params.id;
        console.log('## Wines.prototype.update, params : ', req.params);

        const sql = `UPDATE wine.wine SET name = 'modified wine' WHERE seq = ${id}`;
        db.query(sql, (err, result) => {
            console.log('wine db result : ', result);
            if (!err) res.send('updated was successful');
        });
    };

    Wines.prototype.deleteWine = (req, res) => {
        let id = req.params.id;
        console.log('## Wines.prototype.delete, params : ', req.params);

        const sql = `DELETE FROM wine.wine WHERE seq = ${id}`;
        db.query(sql, (err, result) => {
            console.log('wine db result : ', result);
            if (!err) res.send('deleted was successful');
        });
    };

    return new Wines;
})();

module.exports = Wines;