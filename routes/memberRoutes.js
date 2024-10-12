const express = require('express');
const Member = require('../models/Members');
const connectDatabase = require('../config/db');

const router = express.Router();

router.route('/').get((req, res) => {
    res.status(200).json({
        message: 'User found',
        user: [
            { name: "Ronie Colemon" }
        ]
    })
})

router.route('/').post(async (req, res) => {
    try {
        const requestBody = await req.body;
        console.log('Request Body: ', requestBody);
        const { firstName, lastName, email, phoneNumber, address } = requestBody;
        if (!firstName && !lastName && !email && !phoneNumber && !address) {
            res.status(400)
            throw new Error('All fields required!')
        }
        await connectDatabase();
        const newUser = await Member(requestBody);
        const savedUser = await newUser.save()
        res.status(200).json({
            message: 'User saved to database',
            success: true,
            savedUser
        })
    } catch (error) {
        console.log("Error: ", error);
    }
})

module.exports = router

