// utils 
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const json = require('json');
const method = require('method-override');
const authroutes = require('./routes/authroutes');
const eventroutes = require('./routes/events');
const adminroutes = require('./routes/admin');
const preResponseMiddleware = require('./middleware/preResponseMiddleware');
const path = require('path');

const setupExpressApp = () => {
    const app = express();
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');
    app.use(express.urlencoded({ extended: true }));
    app.use(method('_method'));
    app.use(express.static(path.join(__dirname, 'public')));
    return app;
};

const setupRoutes = (app) => {
    app.use(authroutes);
    app.use(eventroutes);
    app.use(adminroutes);
};

const startServer = (app, PORT) => {
    app.use(preResponseMiddleware);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

const initialize = () => {
    const PORT = process.env.PORT;
    const app = setupExpressApp();
    setupRoutes(app);
    return { app, PORT };
};

module.exports = {
    initialize,
    startServer,
};
