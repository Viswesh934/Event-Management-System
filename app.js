const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const json = require('json');
const authroutes = require('./routes/authroutes');
const eventroutes = require('./routes/events');
const adminroutes = require('./routes/admin');
const preResponseMiddleware = require('./middleware/preResponseMiddleware');
const PORT = process.env.PORT || 3000;
const db = require('./db/connect');
const method = require('method-override');
//set up template engine
app.set('view engine', 'ejs');
// set up views folder
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: true }))
app.use(method('_method'));
//run the servercd
app.use(authroutes);
app.use(eventroutes);
app.use(adminroutes);
app.use(preResponseMiddleware);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
