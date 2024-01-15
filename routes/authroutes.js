const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const session = require('express-session');

// Use express-flash and express-session middleware
router.use(session({ 
  secret: 'your-secret-key', 
  resave: true, 
  saveUninitialized: true 
}));
router.use(flash());

router.get('/', (req, res) => {
  res.render('home', { message: 'Home Page', user: 'Please login' });
});

router.get('/login', (req, res) => {
  res.render('login', { message: req.flash('message') });
});

router.get('/register', (req, res) => {
  res.render('register', { message: req.flash('message') });
});

// register a person by username,password,phone number and mail id to the Users collection
router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      phonenumber: req.body.phoneNumber,
    });

    // find if the user already exists by username, email, or phone number
    const existingUser = await User.findOne({
      $or: [
        { username: req.body.username },
        { email: req.body.email },
        { phonenumber: req.body.phoneNumber }
      ]
    }).exec();

    if (existingUser) {
      console.log("User already exists");
      req.flash('message', 'User already exists');
      return res.redirect('/register');
    }

    await user.save();
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    req.flash('message', 'An error occurred during registration');
    res.redirect('/register');
  }
});

// login a person by username and password to the Users collection
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      req.flash('message', 'Username or password is incorrect');
      return res.redirect('/login');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      req.flash('message', 'Username or password is incorrect');
      return res.redirect('/login');
    }

    // Log in successful, set session and redirect to home or dashboard
    req.session.user = user;
    res.redirect('/', { message: 'Home Page', user: req.user.username } });
  } catch (error) {
    console.error(error);
    req.flash('message', 'An error occurred during login');
    res.redirect('/login');
  }
});

module.exports = router;
