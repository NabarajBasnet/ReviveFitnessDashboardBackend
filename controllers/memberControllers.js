const connectDatabase = require("../config/db");
const Member = require("../models/Members");
const MemberRegistrationEmail = require("../services/Email/MemberRegistrationEmail");

const getAllMembers = async (req, res) => {
    await connectDatabase();
    const users = await Member.find();
    res.status(200).json({
        message: 'User found',
        users
    })
};

const registerNewMember = async (req, res) => {
    try {
        await connectDatabase();

        const requestBody = await req.body;
        console.log('Request Body: ', requestBody);
        const newMember = await new Member(requestBody);
        const savedMember = await newMember.save();
        await MemberRegistrationEmail(savedMember.email, savedMember._id,)
        res.status(200).json({
            message: "New member registered successfully",
            success: true,
            savedMember
        });

    } catch (error) {
        console.log("Error: ", error);
    }
};

module.exports = { getAllMembers, registerNewMember };
