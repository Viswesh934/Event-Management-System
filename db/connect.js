const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Event-Manager');
if(mongoose.connection.readyState){
    console.log("Connected to database");
}
else{
    console.log("Error connecting to database");
}
