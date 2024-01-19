const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    participantName: {
        type: String,
        required: true,
    },
    organizationName: {
        type: String,
        required: true,
    },
});

const analysisSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
        unique: true,
    },
    totalRegistrations: {
        type: Number,
        default: 0,
    },
    participants: [participantSchema],
});

const Analysis = mongoose.model('Analysis', analysisSchema);

module.exports = Analysis;
