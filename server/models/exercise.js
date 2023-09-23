const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    category: String,
    title: {
        type: String,
        unique: true
    },
    last: [{
        reps: Number,
        time: Number,
        weight: Number
    }]
});

const exerciseModel = mongoose.model('exercise', exerciseSchema);

module.exports = exerciseModel;
