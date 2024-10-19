const mongoose = require('mongoose');

const MembersSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    secondaryContactNo: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    address: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'OnHold'],
        default: 'Active',
    },
    membershipOption: {
        type: String,
    },
    membershipType: {
        type: String,
    },
    membershipShift: {
        type: String,
    },
    membershipDate: {
        type: Date,
        required: true,
    },
    membershipDuration: {
        type: String,
    },
    membershipExpireDate: {
        type: Date,
    },
    paymentMethod: {
        type: String,
    },
    discountAmmount: {
        type: Number,
        default: 0,
    },
    discountReason: {
        type: String,
    },
    discountCode: {
        type: String,
    },
    admissionFee: {
        type: Number,
        default: 1000,
    },
    finalAmmount: {
        type: Number,
        default: 5000,
    },
    paidAmmount: {
        type: Number,
        required: true,
    },
    receiptNo: {
        type: String,
    },
    dueAmmount: {
        type: Number,
        default: 0,
    },
    referenceCode: {
        type: String,
    },
    remark: {
        type: String,
    },
    actionTaker: {
        type: String,
    },
}, {
    timestamps: true,
});

const Member = mongoose.models.members || mongoose.model('members', MembersSchema);
module.exports = Member;
