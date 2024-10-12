const express = require('express');
const connectDatabase = require('./config/db');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
connectDatabase()
app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`);
})
