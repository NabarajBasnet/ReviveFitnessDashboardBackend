const express = require('express');
const connectDatabase = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser')
const corn = require('node-cron')
const TemporaryMemberAttendance = require('./models/AttendanceHistory/Members/24HourHistory');
const updateMembershipStatus = require('./services/Memberships/ExpiredMemberships');


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

app.use('/api/temporary-member-attendance-history', cors(corsOptions), require('./routes/TemporaryAttendanceHistory'))
app.options('/api/temporary-member-attendance-history', cors(corsOptions));

app.use('/api/permanent-member-attendance-history', cors(corsOptions), require('./routes/PermanentAttendanceHistory'))
app.options('/api/permanent-member-attendance-history', cors(corsOptions));

app.use('/api/search-all-members', cors(corsOptions), require('./routes/searchMembers'))
app.options('/api/search-all-members', cors(corsOptions));

app.use('/api/qr', cors(corsOptions), require('./routes/sendQr'));
app.options('/api/send-qr', cors(corsOptions));

// corn job
corn.schedule('0 0 * * *', async () => {
    try {
        await TemporaryMemberAttendance.deleteMany({});
    } catch (error) {
        console.log('Error: ', error);
    }
});

corn.schedule('0 0 * * *', async () => {
    try {
        console.log('Running membership expiration check...');
        await updateMembershipStatus();
    } catch (error) {
        console.log('Error: ', error);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
