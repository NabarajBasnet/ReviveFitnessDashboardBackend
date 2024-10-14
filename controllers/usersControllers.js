//@GET user all users from database
//api/Users
//access public
const connectDatabase = require("../config/db");
const User = require("../models/Users");
const bcryptjs = require('bcryptjs')

const getAllUsers = async (req, res) => {
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
};


//@POST Register new user
//api/Users
//access public

const postUser = async (req, res) => {
    try {
        await connectDatabase();
        const requestBody = await req.body;
        const { firstName, lastName, email, phoneNumber, password, confirmPassword, address, dob } = requestBody;

        // Validate all fields
        if (!firstName && !lastName && !email && !phoneNumber && !password && !confirmPassword && !address && !dob) {
            res.status(400)
            throw new Error('All fields required!')
        }

        // Validate if user exists
        const validateUser = await User.findOne({ email });
        if (validateUser) {
            res.status(407)
            throw new Error('User exists!')
        }

        // Match password
        const matchPasswords = password === confirmPassword;
        if (!matchPasswords) {
            res.status(408)
            throw new Error('Passwords must be same!')
        }

        // Check Phone Number Length
        const CheckPhoneNumberLength = phoneNumber.length >= 10;
        if (!CheckPhoneNumberLength) {
            res.status(409)
            throw new Error('Minimum 10 digits phone number is required!')
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const FilteredRequestBody = { firstName, lastName, email, phoneNumber, password: hashedPassword, address, dob };

        const newUser = await new User(FilteredRequestBody);
        const savedUser = await newUser.save()
        res.status(200).json({
            message: 'User saved to database',
            success: true,
            savedUser
        })
    } catch (error) {
        console.log('Error: ', error);
    }
};

module.exports = { getAllUsers, postUser };
