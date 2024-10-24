const ConnectDatabase = require('../config/db');
const User = require('../models/Users');

const getAllUsers = async (req, res) => {
    try {
        await ConnectDatabase();
        const users = await User.find();
        res.status(200).json({
            message: 'Users found',
            users,
        })
    } catch (error) {
        console.log('Error: ', error);
    }
};

const getSingleUser = async (req, res) => {
    try {
        const userId = req.params.id;
        await ConnectDatabase();
        const user = await User.findById(userId);

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
        console.log('Error: ', error);
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

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: requestBody },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.log('Error: ', error);
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
