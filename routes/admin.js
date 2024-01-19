const express = require('express');
const Analysis = require('../models/analysis');
const events = require('../models/events');
const router = express.Router();

router.post('/analysis', async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.isAuthenticated()) {
            return res.redirect('/login'); // Redirect to login if not authenticated
        }

        const { eventName, participantName, Organizationname } = req.body;

        // Check if the participant is already registered for this event
        const existingParticipant = await Analysis.findOne({
            eventName,
            'participants.username': req.user.username,
        });

        if (existingParticipant) {
            // Participant is already registered
            console.log('Participant is already registered');
            return res.redirect('/events'); // Redirect or handle accordingly
        }


        await Analysis.findOneAndUpdate(
            { eventName },
            {
                $push: {
                    participants: {
                        username: req.user.username,
                        participantName,
                        organizationName: Organizationname,
                    },
                },
                $inc: { totalRegistrations: 1 },
            },
            { new: true, upsert: true }
        );

        res.redirect('/events');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/analytics', async (req, res) => {
    try {
    
        const analyticsData = await Analysis.find();

        // Extract relevant data for charts
        const eventNames = analyticsData.map(data => decodeURIComponent(data.eventName));
        const registrationCounts = analyticsData.map(data => data.totalRegistrations);
        console.log(eventNames)
        console.log(registrationCounts)

        res.render('analytics', { eventNames, registrationCounts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;



