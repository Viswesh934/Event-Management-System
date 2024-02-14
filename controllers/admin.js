const flash = require('connect-flash');
const Analysis = require('../models/analysis');
const events = require('../models/events');

// Function to handle participant registration for an event
const registerParticipant = async (req, res) => {
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
            req.flash('error', 'You have already registered for this event');
            return res.redirect('/events');
        }

        await Analysis.findOneAndUpdate(
            { eventName },
            {
                $push: {
                    participants: {
                        username: req?.user?.username,
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
        res.redirect('/events');
        throw error
    }
};


// Function to fetch analytics data
const getAnalyticsData = async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.redirect('/login'); 
        }
        const analyticsData = await Analysis.find();

        // Extract relevant data for charts
        const eventNames = analyticsData.map(data => decodeURIComponent(data.eventName));
        const registrationCounts = analyticsData.map(data => data.totalRegistrations);

        res.render('analytics', { eventNames, registrationCounts });
    } catch (error) {
        throw error
    }
};

// Function to create a new event
const createEvent = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login'); // Redirect to login if not authenticated
    }
    if (req.user.role === 'admin') {
        try {
            const {
                eventname,
                eventdescription,
                eventdate,
                eventtime,
                eventvenue,
                eventorganizer,
                eventorganizeremail,
                eventorganizerphonenumber
            } = req.body;

            const event = new events({
                eventname,
                eventdescription,
                eventdate,
                eventtime,
                eventvenue,
                eventorganizer,
                eventorganizeremail,
                eventorganizerphonenumber
            });

            await event.save();
            res.redirect('/events');
        } catch (error) {
            res.redirect('/events');
        }
    } else {
        res.redirect('/events');
    }
};

// Function to delete an event
const deleteEvent = async (req, res) => {
    if (req.user.role === 'admin') {
        try {
            const { id } = req.params;
            const deleteevent = await events.findById(id);
            await events.findByIdAndDelete(id);

            await Analysis.deleteOne({ eventName: deleteevent.eventname });

            res.redirect('/events');
        } catch (error) {
            throw error;
        }
    } else {
        res.redirect('/events', { msg: 'You are not authorized to delete events' });
    }
};

module.exports = {
    registerParticipant,
    getAnalyticsData,
    createEvent,
    deleteEvent,
};

