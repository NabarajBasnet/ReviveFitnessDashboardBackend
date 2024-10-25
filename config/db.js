const mongoose = require('mongoose');

const ConnectDatabase = async () => {
    try {
        const connectionStr = process.env.CONNECTION_STRING;
        await mongoose.connect(connectionStr);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
};

module.exports = ConnectDatabase;
