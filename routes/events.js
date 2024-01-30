const express = require('express');
const router = express.Router();
const econtroller = require('../controllers/events');

// Get events data
router.get('/events', econtroller.getEvents);


//filter events based on value
router.post('/dashboard', econtroller.filterEvents);
module.exports = router;