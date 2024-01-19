const express = require('express');
const router = express.Router();
const events  = require('../models/events');

// Get events data
router.get('/events', (req, res) => {
    // get data from mongodb and pass it to view
    events.find({})
        .then(data => {
            res.render('events', { user: req.user, events: data });
        })
        .catch(err => {
            throw err;
        });
});

//filter events based on value
router.post('/dashboard', (req,res) =>{
    const {filterBy, filterValue} = req.body;
    if(filterBy === 'eventName'){
        events.find({eventname: filterValue})
        .then(data => {
            res.render('events', { user: req.user, events: data });
        })
        .catch(err => {
            throw err;
        });
    }
    else if(filterBy === 'eventDate'){
        events.find({eventdate: filterValue})
        .then(data => {
            res.render('events', { user: req.user, events: data });
        })
        .catch(err => {
            throw err;
        });
    }
    else if(filterBy === 'eventVenue'){
        events.find({eventvenue: filterValue})
        .then(data => {
            res.render('events', { user: req.user, events: data });
        })
        .catch(err => {
            throw err;
        });
    }
    else if(filterBy === 'eventOrganizer'){
        events.find({eventorganizer: filterValue})
        .then(data => {
            res.render('events', { user: req.user, events: data });
        })
        .catch(err => {
            throw err;
        });
    }
    else if(filterBy == 'organizerPhoneNumber'){
        events.find({eventorganizerphonenumber: filterValue})
        .then(data =>{
            res.render('events', { user: req.user, events: data });
        })
        .catch(err => {
              throw err;
        });
    }
    else{
        events.find({})
        .then(data => {
            res.render('events', { user: req.user, events: data });
        })
        .catch(err => {
            throw err;
        });
    }

})


module.exports = router;