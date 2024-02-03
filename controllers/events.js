const events  = require('../models/events');

// get events data

const getEvents = async (req, res) => {
    try {
        const data = await events.find({});
        res.render('events', { user: req?.user, events: data });
    } catch (err) {
        throw err;
    }
};

// filter events

const filterEvents = async (req, res) => {
    const { filterBy, filterValue } = req?.body;

    let query = {};

    switch (filterBy) {
        case 'eventName':
            query = { eventname: filterValue };
            break;
        case 'eventDate':
            query = { eventdate: filterValue };
            break;
        case 'eventVenue':
            query = { eventvenue: filterValue };
            break;
        case 'eventOrganizer':
            query = { eventorganizer: filterValue };
            break;
        case 'organizerPhoneNumber':
            query = { eventorganizerphonenumber: filterValue };
            break;
        default:
            // No specific filter, return all events
            break;
    }

    try {
        const data = await events.find(query);
        res.render('events', { user: req?.user, events: data });
    } catch (err) {
        throw err;
    }
};

module.exports = {
    getEvents,
    filterEvents,
};