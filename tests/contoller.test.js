const { registerParticipant } = require('../controllers/admin');
const Analysis = require('../models/analysis');

jest.mock('../models/analysis', () => ({
    findOneAndUpdate: jest.fn(),
    findOne: jest.fn()
}));

describe('Admin Controller', () => {
    describe('registerParticipant', () => {
        test('should register a participant', async () => {
            const req = {
                isAuthenticated: jest.fn().mockReturnValue(true),
                user: { username: 'testUser' },
                body: { eventName: 'testEvent', participantName: 'testParticipant', Organizationname: 'testOrganization' },
            };

            const res = {
                redirect: jest.fn(),
                flash: jest.fn(),
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

        test('should handle errors', async () => {
            const req = {
                isAuthenticated: jest.fn().mockReturnValue(true),
                user: { username: 'testUser' },
                body: { eventName: 'testEvent', participantName: 'testParticipant', Organizationname: 'testOrganization' },
            };

            const res = {
                redirect: jest.fn(),
                flash: jest.fn(),
            };

            // Mock Analysis.findOne to throw an error
            Analysis.findOne.mockRejectedValue(new Error('Test error'));

            // Execute registerParticipant
            await expect(registerParticipant(req, res)).rejects.toThrow('Test error');
        });
    });
});
