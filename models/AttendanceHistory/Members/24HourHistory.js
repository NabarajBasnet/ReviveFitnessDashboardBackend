const mongoose = require('mongoose');

const getNextMidnight = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setHours(24, 0, 0, 0);
    return tomorrow;
};

const TemporaryMemberAttendanceSchema = new mongoose.Schema({
    memberId: {
        type: String,
        required: true,
        ref: 'Member'
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
    expiration: {
        type: Date,
        default: getNextMidnight
    }
});

TemporaryMemberAttendanceSchema.index({ expiration: 1 }, { expireAfterSeconds: 0 });

const TemporaryMemberAttendance = mongoose.models.temporarymemberattendance || mongoose.model('temporarymemberattendance', TemporaryMemberAttendanceSchema);
module.exports = TemporaryMemberAttendance;
