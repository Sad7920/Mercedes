const mongoose = require('mongoose');
require('dotenv').config();


module.exports = () => {
    try {
        mongoose.connect(process.env.DB);
        console.log('Connected to database');
    } catch (error) {
        console.error(`Error connecting to the database. \n${error}`);
    }
}

