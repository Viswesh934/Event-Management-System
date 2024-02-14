const { registerUser,loginUser,localStrategyFunction } = require('../controllers/authroutes');
const User = require('../models/users');
const passport= require('passport');
jest.mock('../models/users');

const bcrypt = require('bcrypt');
jest.mock('bcrypt');
jest.mock('passport');

describe('registerUser function', () => {
  //test for registering user
  it('should register a new user', async () => {
    // Mocking User.findOne 
    const req = {
      body: {
        username: 'testuser',
        password: 'testpassword',
        email: 'test@example.com',
        phoneNumber: '1234567890',
      },
      flash: jest.fn(),
    };
    const res = {
      redirect: jest.fn(),
    };
    const findOneQueryMock = {
      exec: jest.fn().mockResolvedValueOnce(null),
    };
    User.findOne.mockReturnValueOnce(findOneQueryMock);

    // Mocking bcrypt.hash 
    bcrypt.hash.mockResolvedValueOnce('hashedPassword');

    // Mocking user.save 
    const saveMock = jest.fn().mockResolvedValueOnce();
    const newUser = {
      save: saveMock,
    };
    User.mockReturnValueOnce(newUser);

    await registerUser(req, res);

    // Asserting that User.findOne().exec() is called
    expect(findOneQueryMock.exec).toHaveBeenCalled();

    expect(saveMock).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/login');
  });
  //Test for finding exisiting user
  it('should handle existing user', async () => {
    const req = {
      body: {
        username: 'testuser',
        password: 'testpassword',
        email: 'test@example.com',
        phoneNumber: '1234567890',
      },
      flash: jest.fn(),
    };
    const res = {
      redirect: jest.fn(),
    };
    const existingUser = {};
    const findOneQueryMock = {
      exec: jest.fn().mockResolvedValueOnce(existingUser),
    };
    User.findOne.mockReturnValueOnce(findOneQueryMock);

    await registerUser(req, res);

    expect(req.flash).toHaveBeenCalledWith('message', 'User already exists');

    expect(res.redirect).toHaveBeenCalledWith('/register');
  });
  it('should handle registration error', async () => {
    const req = {
      body: {
        username: 'testuser',
        password: 'testpassword',
        email: 'test@example.com',
        phoneNumber: '1234567890',
      },
      flash: jest.fn(),
    };
    const res = {
      redirect: jest.fn(),
    };
    const findOneQueryMock = {
      exec: jest.fn().mockRejectedValueOnce(new Error('Database error')),
    };
    User.findOne.mockReturnValueOnce(findOneQueryMock);

    await registerUser(req, res);

    expect(req.flash).toHaveBeenCalledWith('message', 'An error occurred during registration');


    expect(res.redirect).toHaveBeenCalledWith('/register');
  });

});

describe('loginUser', () => {
  it('should configure Passport authentication middleware with correct options', () => {
    const authenticateMock = jest.fn();
    passport.authenticate.mockReturnValue(authenticateMock);

    loginUser;

    expect(passport.authenticate).toHaveBeenCalledWith('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    });
  });

  
  describe('Local Strategy', () => {
    it('should return false and an error message if the username is incorrect', async () => {
      const done = jest.fn();
      await localStrategyFunction('nonexistentuser', 'password', done);
      expect(done).toHaveBeenCalledWith(null, false, { message: 'Username or password is incorrect' });
    });
  
    it('should return false and an error message if the password is incorrect', async () => {
      const done = jest.fn();
      await localStrategyFunction('existinguser', 'wrongpassword', done);
      expect(done).toHaveBeenCalledWith(null, false, { message: 'Username or password is incorrect' });
    });
  
  });
 
});