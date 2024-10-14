const express = require('express');
const connectDatabase = require('../config/db');
const User = require('../models/Users');
const router = express.Router()


router.route('/').get(async (req, res) => {
    try {
        await connectDatabase();
        const users = await User.find();
        res.status(200).json({
            message: 'Users found',
            success: true,
            users
        });
    } catch (error) {
        console.log('Error: ', error);
    }
});

router.route('/').post(async (req, res) => {
    try {
        const requestBody = await req.body;
        console.log('Request Body: ', requestBody);
        const { firstName, lastName, email, phoneNumber, password, confirmPassword, address, dob } = requestBody;
        if (!firstName && !lastName && !email && !phoneNumber && !password && !confirmPassword && !address && !dob) {
            res.status(400)
            throw new Error('All fields required!')
        }
        await connectDatabase();
        const newUser = await new User(requestBody);
        const savedUser = await newUser.save()
        res.status(200).json({
            message: 'User saved to database',
            success: true,
            savedUser
        })
    } catch (error) {
        console.log('Error: ', error);
    }
});


module.exports = router
