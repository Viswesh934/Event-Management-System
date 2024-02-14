// Tests for events controller
const events = require('../models/events')
const { getEvents,filterEvents } = require('../controllers/events');

jest.mock('../models/events',()=>({
    find: jest.fn(),
}));

describe('Events Controller', () => {
    // Test for getEvents
    describe('getEvents', () => {
        test('should render events page with events data', async () => {
            events.find.mockResolvedValue([]);
            const req = {};
            const res = {
                render: jest.fn()
            }
            await getEvents(req, res);
            expect(res.render).toHaveBeenCalledWith('events', { user: undefined, events: [] });
        });
        test('should catch errors and throw', async () => {
            events.find.mockRejectedValue(new Error('Error fetching events'));
            const req = {};
            const res = {
                render: jest.fn()
            }
            try {
                await getEvents(req, res);
            } catch (error) {
                expect(error.message).toBe('Error fetching events');
            }
        });
    });
    // Test for filterEvents
    describe('filterEvents', () => {
        test('should render events page with filtered events data', async () => {
            events.find.mockResolvedValue([]);
            const req = {
                body: { filterBy: 'eventName', filterValue: 'testEvent' }
            };
            const res = {
                render: jest.fn()
            }
            await filterEvents(req, res);
            expect(res.render).toHaveBeenCalledWith('events', { user: undefined, events: [] });
        });
        test('should catch errors and throw', async () => {
            events.find.mockRejectedValue(new Error('Error fetching events'));
            const req = {
                body: { filterBy: 'eventName', filterValue: 'testEvent' }
            };
            const res = {
                render: jest.fn()
            }
            try {
                await filterEvents(req, res);
            } catch (error) {
                expect(error.message).toBe('Error fetching events');
            }
        });
    });
});

   