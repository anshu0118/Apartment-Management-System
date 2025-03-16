const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/add', (req, res) => {
    const { floorNumber, ownerName, fund } = req.body;
    db.query('INSERT INTO apartments (floorNumber, ownerName, fund) VALUES (?, ?, ?)',
        [floorNumber, ownerName, fund], (err, result) => {
            if (err) return res.status(500).send('Error adding apartment');
            res.send('Apartment added');
        });
});

router.get('/', (req, res) => {
    db.query('SELECT * FROM apartments', (err, results) => {
        if (err) return res.status(500).send('Error fetching apartments');
        res.json(results);
    });
});

module.exports = router;
