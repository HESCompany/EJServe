
const express = require('express');
const mysql = require('mysql');

const app = express();
app.set('view engine', 'ejs');

const db = mysql.createConnection({
    host: 'hmonorail.proxy.rlwy.net',
    user: 'uroot',   // replace with your MySQL username
    password: 'pQBcvGIQCskdeZSbAgGMajVYdQnTeqjhL', // replace with your MySQL password
    database: 'railway'   // your database name
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
