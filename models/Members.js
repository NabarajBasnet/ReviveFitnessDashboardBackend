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
    password:{
        type:String
    },
    address: {
        type: String
    },
    dob: {
        type: Date
    }
})

const Member = mongoose.models.members || mongoose.model('members', MembersSchema);
module.exports = Member;
