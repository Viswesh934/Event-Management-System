const User = require('../models/users');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Passport.js user serialization and deserialization
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

// Passport.js local strategy
passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, { message: 'Username or password is incorrect' });
        }
  
        const isPasswordValid = await bcrypt.compare(password, user.password);
  
        if (!isPasswordValid) {
          return done(null, false, { message: 'Username or password is incorrect' });
        }
  
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  ));

  // home page

  const home = async(req, res) => {
    res.render('home', { user: req.user, message: 'Home Page' });
  }

//login page

const login_page = async(req, res) => {
    res.render('login', { message: req.flash('message') });
}

// register page

const register_page = async(req, res) => {
    res.render('register', { message: req.flash('message') });
}

// register user

const registerUser = async (req, res) => {
    try {
      const salt =10;
      const hashedPassword = await bcrypt.hash(req?.body?.password,10);
      const user = new User({
        username: req?.body?.username,
        password: hashedPassword,
        email: req.body.email,
        phonenumber: req.body.phoneNumber,
      });
  
      const existingUser = await User.findOne({
        $or: [
          { username: req?.body?.username },
          { email: req?.body?.email },
          { phonenumber: req?.body?.phoneNumber }
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
  };

  // login user
  const loginUser = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  });
  
  // user logout
  const logoutUser = (req, res) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  };
  
  // render user profile
  const renderUserProfile = (req, res) => {
    try {
      res.render('profile', { user: req?.user });
    } catch (error) {
      console.log(error);
    }
  };


  module.exports = {
    home,
    login_page,
    register_page,
    registerUser,
    loginUser,
    logoutUser,
    renderUserProfile,    
  };