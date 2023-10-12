const mongoose = require('mongoose');
require('dotenv').config()

const mongo = process.env.MONGO

const connectToDB = async () => {

    try {
        await mongoose.connect(mongo);
        console.log('connected to database');
    } catch (error) {
        // handleError(error);
        console.log(error);
    }
}

module.exports = connectToDB;