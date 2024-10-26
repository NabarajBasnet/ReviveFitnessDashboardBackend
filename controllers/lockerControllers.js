const Locker = require('../models/Lockers')
const ConnectDatabase = require('../config/db');

const getAllLockers = async (req, res) => {
    try {
        await ConnectDatabase();
        const lockers = await Locker.find();

        res.status(200).json({
            message: 'Lockers found',
            success: true,
            lockers
        })

    } catch (error) {
        console.log('Error: ', error);
    }
}

const getLockerInformation = async (req, res) => {
    try {

    } catch (error) {
        console.log('Error: ', error);
    }
}

const registerMemberLocker = async (req, res) => {
    try {

    } catch (error) {
        console.log('Error: ', error);
    }
}

const updateMemberLocker = async (req, res) => {
    try {

    } catch (error) {
        console.log('Error: ', error);
    }
}

module.exports = { getAllLockers, getLockerInformation, registerMemberLocker, updateMemberLocker };
