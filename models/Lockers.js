const mongoose = require('mongoose')

const LockersSchema = mongoose.Schema({
    lockerNumber: {
        type: Number
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
    lockerExpireDate: {
        type: Date
    },
    fee: {
        type: String
    },
    paymentMethod: {
        enum: ['Fonepay', 'Cash', 'Card'],
        default: 'Cash'
    },
    referenceId: {
        type: String,
    },
    receiptNo: {
        type: String,
    },
})

const Locker = mongoose.models.lockers || mongoose.model('lockers', LockersSchema);
module.exports = Locker;
