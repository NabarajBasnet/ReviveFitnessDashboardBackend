const ConnectDatabase = require('../config/db');
const User = require('../models/Users');

const getAllUsers = async (req, res) => {
    try {
        await ConnectDatabase();

        const page = parseInt(req.params.page) || 1;
        const limit = parseInt(req.params.limit) || 6;
        const skip = (page - 1) * limit;
        const users = await User.find().skip(skip).limit(limit);
        const totalUsers = await User.countDocuments();
        const totalPages = Math.ceil(totalUsers / limit);

        res.status(200).json({
            message: 'Users found',
            users,
            totalUsers,
            totalPages
        });

    } catch (error) {
        console.log('Error: ', error);
    };
};

const getSingleUser = async (req, res) => {
    try {
        const userId = req.params.id;
        await ConnectDatabase();
        const user = await User.findById(userId);
        console.log('User id: ', userId);

        if (!user) {
            res.status(400).json({
                message: 'User not found',
                success: false,
            })
        };

        res.status(200).json({
            message: 'User found',
            success: true,
            user,
        })
    } catch (error) {
        console.log('Error in get: ', error);
    }
};

const createUser = async (req, res) => {
    try {
        await ConnectDatabase();

    } catch (error) {
        console.log('Error: ', error);
    }
};

const updateUser = async (req, res) => {
    try {
        await ConnectDatabase();
        const userId = req.params.id;
        const requestBody = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { firstName, lastName, email, phoneNumber, address, dob, role } = requestBody;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            requestBody,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Failed to update user' });
        }

        console.log('Updated user: ', updatedUser);
        res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.log('Error updating user: ', error);
        res.status(500).json({
            message: 'Error updating user',
            error: error.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        await ConnectDatabase();

    } catch (error) {
        console.log('Error: ', error);
    }
}

module.exports = { getAllUsers, createUser, updateUser, deleteUser, getSingleUser };
