const mongoose = require('mongoose');

const LockersSchema = mongoose.Schema({
    lockerNumber: {
        type: Number
    },
    memberId: {
        type: String
    },
    memberName: {
        type: String
    },
    renewDate: {
        type: Date
    },
    duration: {
        type: String
    },
    expireDate: {
        type: Date
    },
    fee: {
        type: String
    },
    paymentMethod: {
        type: String,
        enum: ['Fonepay', 'Cash', 'Card'],
        default: 'Cash'
    },
    referenceCode: {
        type: String
    },
    receiptNo: {
        type: String
    },
    isAssigned: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['Expired', 'Booked', 'Empty']
    },
});

const Locker = mongoose.models.lockers || mongoose.model('lockers', LockersSchema);
module.exports = Locker;
