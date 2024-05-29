const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to MongoDB, ${process.env.MONGO_URI}`);

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Stänger ner applikationen om databasanslutningen misslyckas
    }
};

module.exports = connectDB;
