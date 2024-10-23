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
}

const createUser = async (req, res) => {
    try {
        await ConnectDatabase();

    } catch (error) {
        console.log('Error: ', error);
    }
}

const updateUser = async (req, res) => {
    try {
        await ConnectDatabase();

    } catch (error) {
        console.log('Error: ', error);
    }
}

const deleteUser = async (req, res) => {
    try {
        await ConnectDatabase();

    } catch (error) {
        console.log('Error: ', error);
    }
}

module.exports = { getAllUsers, createUser, updateUser, deleteUser };
