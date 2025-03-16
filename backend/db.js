const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',       // Your MySQL username
    password: 'Swayam#2004',       // Your MySQL password (leave empty if no password)
    database: 'apartment_management'
});

db.connect(err => {
    if (err) {
        console.error('Database connection error: ', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

module.exports = db;
