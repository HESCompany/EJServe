
const express = require('express');
const mysql = require('mysql');

const app = express();
app.set('view engine', 'ejs');

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

app.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        res.render('index', { users: results });
    });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
