const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const authMiddleware = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};

app.set('view engine', 'ejs');

app.get('/', authMiddleware, (req, res) => {
  res.render('index', { judul: 'Halo, Dunia!', user: req.session.user });
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create(username, hashedPassword);
    res.redirect('/login');
  } catch (error) {
    console.log(error);
    res.redirect('/register');
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findByUsername(username);
    if (!user) {
      return res.redirect('/login');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.redirect('/login');
    }

    req.session.user = user;
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.redirect('/login');
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
