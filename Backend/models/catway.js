const mongoose = require ('mongoose');

const CatwaySchema = new mongoose.Schema({
    catwayNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    catwayType: {
        type: String,
        anum: ['short', 'long'],
        required: true
    },
    catwayState: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model ('catway', CatwaySchema);