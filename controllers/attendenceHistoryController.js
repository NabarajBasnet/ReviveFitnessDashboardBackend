const ConnectDatabase = require('../config/db');
const TemporaryMemberAttendance = require('../models/AttendanceHistory/Members/24HourHistory');
const PermanentMemberAttendance = require('../models/AttendanceHistory/Members/PermanentHistory');

const getTemporaryMemberAttendanceHistory = async (req, res) => {
    try {
        await ConnectDatabase();
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const temporarymemberattendancehistory = await TemporaryMemberAttendance.find().skip(skip).limit(limit);
        const totalAttendance = await TemporaryMemberAttendance.countDocuments();
        const totalPages = Math.ceil(totalAttendance / limit);

        res.status(200).json({
            message: 'Temporary Member Attendance History Found',
            temporarymemberattendancehistory,
            totalAttendance,
            totalPages
        });

    } catch (error) {
        console.log('Error: ', error);
    }
};

const getPermanentMemberAttendanceHistory = async (req, res) => {
    try {
        await ConnectDatabase();
        const getpermanentmemberattendancehistory = await PermanentMemberAttendance.find();
        res.status(200).json({
            message: 'Permament Member Attendance History Found',
            getpermanentmemberattendancehistory
        });
    } catch (error) {
        console.log('Error: ', error);
    }
};

const postTemporaryMemberAttendanceHistory = async (req, res) => {
    try {
        await ConnectDatabase();

        const requestBody = await req.body;
        console.log('Request Body: ', requestBody);
        const newTemporaryMemberAttendance = await new TemporaryMemberAttendance(requestBody);
        const savedTemporaryMemberAttendance = await newTemporaryMemberAttendance.save();

        res.status(200).json({
            message: 'Temporary member attendance history created',
            success: true,
            savedTemporaryMemberAttendance,
        });

    } catch (error) {
        console.log("Error: ", error);
    }
};

const postPermanentMemberAttendanceHistory = async (req, res) => {
    try {
        await ConnectDatabase();

        const requestBody = await req.body;
        const newPermanentMemberAttendance = await new PermanentMemberAttendance(requestBody);

        const savedPermanentMemberAttendance = await newPermanentMemberAttendance.save();
        res.status(200).json({
            message: 'Permanent member attendance history created',
            success: true,
            savedPermanentMemberAttendance
        });

    } catch (error) {
        console.log("Error: ", error);
    }
};

module.exports = { getTemporaryMemberAttendanceHistory, getPermanentMemberAttendanceHistory, postTemporaryMemberAttendanceHistory, postPermanentMemberAttendanceHistory };
