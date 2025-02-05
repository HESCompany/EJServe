const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { judul: 'Halo, Dunia!' });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
