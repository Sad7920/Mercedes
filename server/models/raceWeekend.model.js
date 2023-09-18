const mongoose = require('mongoose');
const { Schema } = mongoose;

const raceWeekendSchema = new Schema({
    user_id: String,
    user_name: String,
    race_name: String,
    race_start_date: String,
    race_end_date: String,
    saved: Boolean,
    sets: [{
        /*  type: {
             type: Object,
         }, */
        setType: String,
        count: Number,
        used: Number,
        new: Number
    }, {
        /* type: {
            type: Object,
        }, */
        setType: String,
        count: Number,
        used: Number,
        new: Number
    }, {
        /* type: {
            type: Object,
        }, */
        setType: String,
        count: Number,
        used: Number,
        new: Number
    }],
    sessions: [String]
}, { timestamps: true, typeKey: '$type' });

const sessionSchema = new Schema({
    session_name: String,
    race_weekend_id: String,
    returns: [{
        tyreType: String,
        count: Number,
    }, {
        tyreType: String,
        count: Number,
    }, {
        tyreType: String,
        count: Number,
    },],
    using: [{

        tyreType: String,
        count: Number,
        used: Number,
        new: Number
    }, {
        tyreType: String,
        count: Number,
        used: Number,
        new: Number
    }, {
        tyreType: String,
        count: Number,
        used: Number,
        new: Number
    }]
}, { timestamps: true, typeKey: '$type' });


const raceWeekendModel = mongoose.model('raceWeekend', raceWeekendSchema);
const sessionModel = mongoose.model('sessions', sessionSchema);

module.exports = { raceWeekendModel, sessionModel };