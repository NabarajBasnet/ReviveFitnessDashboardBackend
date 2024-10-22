const express = require('express');
const connectDatabase = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser')
const corn = require('node-cron')
const TemporaryMemberAttendance = require('./models/AttendanceHistory/Members/24HourHistory');


const port = process.env.PORT || 5000;
const app = express();

// CORS Configuration
const corsOptions = {
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
};

app.use(express.json());
app.use(cookieParser());

app.use('/api/members', cors(corsOptions), require('./routes/memberRoutes'));
app.use('/api/auth', cors(corsOptions), require('./routes/auth'));
app.options('/api/members', cors(corsOptions));
app.options('/api/auth', cors(corsOptions));
app.use('/api/validate-qr', cors(corsOptions), require('./routes/validate-qr'))
app.options('/api/validate-qr', cors(corsOptions));



// corn job
corn.schedule('0 0 * * *', async () => {
    try {
        await TemporaryMemberAttendance.deleteMany({});
    } catch (error) {
        console.log('Error: ', error);
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
