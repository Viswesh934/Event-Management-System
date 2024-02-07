const express = require('express');
const Analysis = require('../models/analysis');
const events = require('../models/events');
const preResponseMiddleware = require('../middleware/preResponseMiddleware');
const router = express.Router();
const admincontroller = require('../controllers/admin');

router.use(preResponseMiddleware);

router.post('/analysis', admincontroller.registerParticipant);


router.get('/analytics', admincontroller.getAnalyticsData);

router.post('/create-event', admincontroller.createEvent);


router.delete('/delete-event/:id', admincontroller.deleteEvent);


module.exports = router;



