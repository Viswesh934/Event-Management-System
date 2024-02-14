const { initialize, startServer } = require('./utils');
const db = require('./db/connect');

const { app, PORT } = initialize();


startServer(app, PORT);