const connectDatabase = require("../config/db");
const Member = require("../models/Members");
const TemporaryMemberAttendance = require("../models/AttendanceHistory/Members/24HourHistory");
const PermanentMemberAttendance = require("../models/AttendanceHistory/Members/PermanentHistory");

const validateQr = async (req, res) => {
    try {
        const memberId = req.params.id;
        await connectDatabase();
        const member = await Member.findById(memberId);

        if (!member) {
            return res.status(404).json({
                success: false,
                error: 'Member not found'
            });
        }

        const todaysDate = new Date().toISOString().split('T')[0];
        const membershipDate = member.membershipDate?.toISOString().split('T')[0];
        const membershipExpireDate = member.membershipExpireDate?.toISOString().split('T')[0];
        const membershipOption = member.membershipOption;
        const membershipType = member.membershipType;

        if (!membershipDate || !membershipExpireDate) {
            return res.status(400).json({
                success: false,
                error: 'Membership details are incomplete'
            });
        }

        if (todaysDate > membershipExpireDate) {
            return res.status(403).json({
                success: false,
                message: 'Membership has expired',
                member,
                membershipOption,
                membershipType,
                membershipDate,
                membershipExpireDate,
            });
        }

        // Create attendance history since the membership is valid
        const attendanceData = {
            memberId: member._id,
            fullName: member.fullName,
            membershipOption,
        };

        // Create temporary attendance history
        const newTemporaryAttendance = new TemporaryMemberAttendance(attendanceData);
        await newTemporaryAttendance.save();

        // Create permanent attendance history
        const newPermanentAttendance = new PermanentMemberAttendance(attendanceData);
        await newPermanentAttendance.save();

        return res.status(200).json({
            success: true,
            message: 'Membership is valid',
            member,
            membershipOption,
            membershipType,
            membershipDate,
            membershipExpireDate,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Server error, please try again later'
        });
    }
};

module.exports = { validateQr };
