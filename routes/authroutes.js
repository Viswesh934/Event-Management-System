const express = require('express');
const router = express.Router();
const User = require('../models/users');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const authcontroller = require('../controllers/authroutes');
// Use express-flash and express-session middleware
router.use(session({ 
  secret: 'Viswesh', 
  resave: true, 
  saveUninitialized: true 
}));
router.use(flash());
router.use(passport.initialize());
router.use(passport.session());


router.get('/', authcontroller.home);

router.get('/login', authcontroller.login_page);


router.get('/register', authcontroller.register_page);

router.post('/register', authcontroller.registerUser);

router.post('/login', authcontroller.loginUser);

router.get('/logout', authcontroller.logoutUser);

router.get('/profile', authcontroller.renderUserProfile);

module.exports = router;
