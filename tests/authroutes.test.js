const {
    login_page,
    register_page,
    renderUserProfile,
    home,
    registerUser,
    loginUser,
    logoutUser,
  } = require('../controllers/authroutes');

  jest.mock('../models/users', () => ({
    findOne: jest.fn(),
    save: jest.fn(),
    findById: jest.fn(),
  }));
  
  jest.mock('bcrypt', () => ({
    hash: jest.fn().mockResolvedValue('hashedPassword'),
  }));
  
  const mockRequest = (sessionData, bodyData) => {
    return {
      session: sessionData,
      body: bodyData,
      flash: jest.fn().mockReturnValue('Flash message'),
    };
  };
  
  const mockResponse = () => {
    const res = {};
    res.render = jest.fn().mockReturnValue(res);
    res.redirect = jest.fn().mockReturnValue(res);
    return res;
  };
  
  describe('User Controller', () => {
    describe('home', () => {
        it('should render home page', async () => {
          const req = mockRequest({}, {});
          const res = mockResponse();
  
          home(req, res);
  
          expect(res.render).toHaveBeenCalledWith('home', { user: undefined, message: 'Home Page' });
        });});
    describe('login_page', () => {
      it('should render login page', async () => {
        const req = mockRequest({}, {});
        const res = mockResponse();
  
        login_page(req, res);
  
        expect(req.flash).toHaveBeenCalledWith('message');
        expect(res.render).toHaveBeenCalledWith('login', { message: 'Flash message' });
      });
    });
  
    describe('register_page', () => {
      it('should render register page', async () => {
        const req = mockRequest({}, {});
        const res = mockResponse();
  
        register_page(req, res);
  
        expect(req.flash).toHaveBeenCalledWith('message');
        expect(res.render).toHaveBeenCalledWith('register', { message: 'Flash message' });
      });
    });
    
    describe('renderUserProfile',()=>{
        it('should render user profile', async()=>{
            const req = mockRequest({}, {});
            const res = mockResponse();
            renderUserProfile(req, res);
            expect(res.render).toHaveBeenCalledWith('profile', { user: undefined});         

        });

    });

    describe('loginUser', () => {
        it('should login a user', async () => {
          const req = mockRequest({}, {});
          const res = mockResponse();
    
          await loginUser(req, res);
    
          expect(res.redirect).toHaveBeenCalledWith('/login');
        });
      });
  });
  