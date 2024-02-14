const { request } = require('express');
const { registerParticipant, getAnalyticsData, createEvent, deleteEvent } = require('../controllers/admin');
const Analysis = require('../models/analysis');
const events = require('../models/events');
const flash = require('connect-flash');

jest.mock('../models/analysis', () => ({
    findOneAndUpdate: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    deleteOne: jest.fn()
}));
jest.mock('../models/events', () => ({
    save: jest.fn(),
    findById: jest.fn(),
    findByIdAndDelete: jest.fn(),
}));


describe('Admin Controller', () => {
    describe('registerParticipant', () => {
        test('should register a participant with valid credentials', async () => {
            const req = {
                isAuthenticated: jest.fn().mockReturnValue(true),
                user: { username: 'testUser' },
                body: { eventName: 'testEvent', participantName: 'testParticipant', Organizationname: 'testOrganization' },
                flash: jest.fn(),
            };

            const res = {
                redirect: jest.fn(),
            };

            // Mock successful Analysis.findOne result
            Analysis.findOne.mockResolvedValue(null);

            // Mock successful Analysis.findOneAndUpdate result
            Analysis.findOneAndUpdate.mockResolvedValue({});

            // Execute registerParticipant
            await registerParticipant(req, res);

            // Assertions
            expect(Analysis.findOne).toHaveBeenCalledWith({ eventName: 'testEvent', 'participants.username': 'testUser' });
            expect(Analysis.findOneAndUpdate).toHaveBeenCalledWith(
                { eventName: 'testEvent' },
                {
                    $push: {
                        participants: {
                            username: 'testUser',
                            participantName: 'testParticipant',
                            organizationName: 'testOrganization',
                        },
                    },
                    $inc: { totalRegistrations: 1 },
                },
                { new: true, upsert: true }
            );
            expect(res.redirect).toHaveBeenCalledWith('/events');
        });
        test("should redirect to login page if user is not authenticated", async () => {
            const req = {
                isAuthenticated: jest.fn().mockReturnValue(false),
            };
            const res = {
                redirect: jest.fn(),
            };
            await registerParticipant(req, res);
            expect(res.redirect).toHaveBeenCalledWith('/login');
        })
        test("should redirect if the user is already registered", async () => {
            const req = {
                isAuthenticated: jest.fn().mockReturnValue(true),
                user: { username: 'testUser' },
                body: { eventName: 'testEvent', participantName: 'testParticipant', Organizationname: 'testOrganization' },
                flash: jest.fn(),
            };
            const res = {
                redirect: jest.fn(),

            };
            // Mock Analysis.findOne result
            Analysis.findOne.mockResolvedValue({ participants: [{ username: 'testUser' }] });
            await registerParticipant(req, res);
            expect(res.redirect).toHaveBeenCalledWith('/events');
        });
        test("Should catch errors and redirect to events page", async () => {
            const req = {
                isAuthenticated: jest.fn().mockReturnValue(true),
                user: { username: 'testUser' },
                body: { eventName: 'testEvent', participantName: 'testParticipant', Organizationname: 'testOrganization' },
                flash: jest.fn(),
            }
            const res = {
                redirect: jest.fn(),
            }
            Analysis.findOneAndUpdate.mockRejectedValue(new Error('Error registering participant'));
            await registerParticipant(req, res);
            expect(res.redirect).toHaveBeenCalledWith('/events');
        });
    });

    // Test for getting analytics data

    describe("Get analytics data", () => {
        test("should render analytics page with data", async () => {

            Analysis.find.mockResolvedValue([]);
            const req = {
                isAuthenticated: jest.fn().mockReturnValue(true),
            };
            const res = {
                render: jest.fn()
            }
            // Execute getAnalyticsData
            await getAnalyticsData(req, res);
            expect(res.render).toHaveBeenCalledWith('analytics', { eventNames: [], registrationCounts: [] });

        });
        test("Redirect to login if not authenticated", async () => {
            const req = {
                isAuthenticated: jest.fn().mockReturnValue(false),

            };
            const res = {
                render: jest.fn(),
                redirect: jest.fn()
            };
            await getAnalyticsData(req, res);
            expect(res.redirect).toHaveBeenCalledWith('/login');
        });
    });

    // Test for creating an event

    describe("Create an event", () => {
        test("should create an event", async () => {
            const req = {
                isAuthenticated: jest.fn().mockReturnValue(true),
                user: {
                    role: 'admin',
                },
                body: {
                    eventname: "testEvent",
                    eventdescription: "testDescription",
                    eventdate: "2024-02-23",
                    eventtime: "12:00 PM",
                    eventvenue: "testVenue",
                    eventorganizer: "testOrganizer",
                    eventorganizeremail: "Organizer12@gmail.com",
                    eventorganizerphonenumber: 9456565675,
                },
            };
            const res = {
                redirect: jest.fn(),
            };
            // mock the save function
            events.save.mockResolvedValue({});
            await createEvent(req, res);
            expect(req.isAuthenticated).toHaveBeenCalled();
            expect(res.redirect).toHaveBeenCalledWith('/events');
        })
        test("should redirect to login page if user is not authenticated", async () => {
            const req = {
                isAuthenticated: jest.fn().mockReturnValue(false),
            };
            const res = {
                redirect: jest.fn(),
            };

            await createEvent(req, res);

            expect(req.isAuthenticated).toHaveBeenCalled();
            expect(res.redirect).toHaveBeenCalledWith('/login');
        });

        test("should redirect to events page if user is authenticated but not admin", async () => {
            const req = {
                isAuthenticated: jest.fn().mockReturnValue(true),
                user: {
                    role: 'user',
                },
            };
            const res = {
                redirect: jest.fn(),
            };

            await createEvent(req, res);

            expect(req.isAuthenticated).toHaveBeenCalled();
            expect(res.redirect).toHaveBeenCalledWith('/events');
        });
        test("should catch errors and redirect to events page", async () => {
            const req = {
                isAuthenticated: jest.fn().mockReturnValue(true),
                user: {
                    role: 'admin',
                },
                body: {
                    eventname: "testEvent",
                    eventdescription: "testDescription",
                    eventdate: "2024-02-23",
                    eventtime: "12:00 PM",
                    eventvenue: "testVenue",
                    eventorganizer: "testOrganizer",
                    eventorganizeremail: "organizer2@gmail.com"
                },
                flash: jest.fn()
            };
            const res = {
                redirect: jest.fn(),
            };
            events.save.mockRejectedValue(new Error('Error saving event'));
            await createEvent(req, res);
            expect(req.isAuthenticated).toHaveBeenCalled();
            expect(res.redirect).toHaveBeenCalledWith('/events');
        }
        );
    });
    // test for deleting events
    describe("Delete an event", () => {
        test("Should delete an event", async () => {
            const req = {
                user: { role: 'admin' },
                params: { id: 12345 },
            }
            const res = {
                redirect: jest.fn(),
            }
            events.findById.mockResolvedValue({});
            events.findByIdAndDelete.mockResolvedValue({});
            Analysis.deleteOne.mockResolvedValue({});
            await deleteEvent(req, res);
            expect(events.findById).toHaveBeenCalledWith(12345);
            expect(events.findByIdAndDelete).toHaveBeenCalledWith(12345);
            expect(Analysis.deleteOne).toHaveBeenCalled();
            expect(res.redirect).toHaveBeenCalledWith('/events');

        });
        test("Should redirect to events page if user is not admin", async () => {
            const req = {
                user: { role: 'user' },
                params: { id: 12345 },
            }
            const res = {
                redirect: jest.fn(),
            }
            await deleteEvent(req, res);
            expect(res.redirect).toHaveBeenCalledWith('/events', { msg: 'You are not authorized to delete events' });
        });

    });








});

