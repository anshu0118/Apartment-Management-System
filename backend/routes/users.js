const express = require('express');
const router = express.Router();
const db = require('../db');

// POST route for login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Debugging: Log incoming request data
    console.log("🔹 Login request data:", { username, password });

    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

    // Perform the query to check if the user exists
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error("❌ Error executing query:", err);
            return res.status(500).send('Database error');
        }

        // Check if user exists
        if (results.length > 0) {
            console.log("✅ User found, login successful:", results[0]);
            res.json({ role: results[0].role });
        } else {
            console.log("❌ Invalid credentials:", { username, password });
            res.status(401).send('Invalid credentials');
        }
    });
});

module.exports = router;
