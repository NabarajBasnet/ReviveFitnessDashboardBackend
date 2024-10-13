const express = require('express');
const connectDatabase = require('./config/db');
const cors = require('cors')
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors);
app.use(express.json());
connectDatabase()
app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`);
})
app.use('/api/users', require('./routes/memberRoutes'))
