const mongoose = require ('mongoose');

const ReservationSchema = new mongoose.Schema({
    Catway: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Catway',
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    boatName: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('reservation', ReservationSchema);