const mongoose = require('mongoose')

const UsersSchema = mongoose.Schema({
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
    password: {
        type: String
    },
    address: {
        type: String
    },
    dob: {
        type: Date
    },
    role: {
        type: String,
        enum: ['Super Admin', 'Admin', 'Moderator', 'User'],
        default: 'User'
    },
})

const User = mongoose.models.users || mongoose.model('users', UsersSchema);
module.exports = User;
