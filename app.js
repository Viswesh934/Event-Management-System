const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const json = require('json');
const authroutes = require('./routes/authroutes');
const PORT = process.env.PORT || 3000;
const db = require('./db/connect');
//set up template engine
app.set('view engine', 'ejs');
// set up views folder
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: true }))
//run the server
app.use(authroutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
