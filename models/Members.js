const mongoose = require('mongoose')

const MembersSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    address: {
        type: String
    }
})

const Member = mongoose.models.members || mongoose.model('members', MembersSchema);
module.exports = Member;
