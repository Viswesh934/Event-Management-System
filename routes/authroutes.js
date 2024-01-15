const express = require('express');
const router = express.Router();
const User=require('../models/users');
const bcrypt=require('bcrypt');
console.log(User);


router.get('/', (req, res) => {
  res.render('home', { message: 'Home Page', user: 'Please login' });
});

router.get('/login', (req, res) => {
  res.render('login', { message: 'login' });
});

router.get('/register', (req, res) => {
  res.render('register', { message: 'Register' });
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
    await user.save();
    res.redirect('/login');
  } catch(error){
    console.log(error);
    res.redirect('/register');    
  }
});

module.exports = router;