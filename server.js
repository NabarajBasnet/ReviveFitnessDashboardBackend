const express = require('express');
const connectDatabase = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// CORS Configuration
const corsOptions = {
    origin: true,
    optionsSuccessStatus: 200,
};

app.use(express.json());
connectDatabase();

app.use('/api/users', cors(corsOptions), require('./routes/memberRoutes'));

app.options('/api/users', cors(corsOptions));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
