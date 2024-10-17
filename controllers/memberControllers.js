const connectDatabase = require("../config/db");
const Member = require("../models/Members");
const MemberRegistrationEmail = require("../services/Email/MemberRegistrationEmail");

const getAllMembers = async (req, res) => {
    await connectDatabase();

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const members = await Member.find().skip(skip).limit(limit);
    const totalMembers = await Member.countDocuments();
    const totalPages = Math.ceil(totalMembers / limit);

    res.status(200).json({
        message: 'Members found',
        members,
        totalMembers,
        totalPages
    });

};

const getSingleMember = async (req, res) => {
    console.log('Member ID: ', req.params.id);
    await connectDatabase();
    const memberId = req.params.id;
    console.log('Member ID: ', memberId);
    const member = await Member.findById(memberId)
    res.status(200).json({
        message: 'Member found',
        member
    });
};

const registerNewMember = async (req, res) => {
    try {
        await connectDatabase();

        const requestBody = await req.body;
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

module.exports = { getAllMembers, registerNewMember, getSingleMember };
