const mongoose = require('mongoose');

const MembersSchema = mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    address: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    secondPhoneNumber: {
        type: String,
    },
    email: {
        type: String,
    },
    dob: {
        type: Date,
    },
    gender: {
        type: String,
    },
    membershipOption: {
        type: String,
    },
    membershipType: {
        type: String,
    },
    membershipDate: {
        type: Date,
    },
    membershipDuration: {
        type: String,
    },
    membershipRenewDate: {
        type: Date,
    },
    membershipExpireDate: {
        type: Date,
    },
    paymentMethod: {
        type: String,
    },
    discountAmmount: {
        type: String,
    },
    discountReason: {
        type: String,
    },
    discountCode: {
        type: String,
    },
    admissionFee: {
        type: String,
    },
    finalAmmount: {
        type: String,
    },
    paidAmmount: {
        type: String,
    },
    dueAmmount: {
        type: String,
    },
    receiptNo: {
        type: String,
    },
    referenceCode: {
        type: String,
    },
    remark: {
        type: String,
    },
    actionTaker: {
        type: String,
    }
})

const Member = mongoose.models.members || mongoose.model('members', MembersSchema);
module.exports = Member;
