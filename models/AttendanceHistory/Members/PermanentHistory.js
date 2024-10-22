const mongoose = require('mongoose')

const PermanentAttendanceSchema = new mongoose.Schema({
    memberId: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
    },
    membershipOption: {
        type: String,
    },
    checkInTime: {
        type: Date,
        default: Date.now
    },
});

const PermanentMemberAttendance = mongoose.models.permanentmemberattendance || mongoose.model('permanentmemberattendance', PermanentAttendanceSchema);
module.exports = PermanentMemberAttendance;
