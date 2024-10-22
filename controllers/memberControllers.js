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
    await connectDatabase();
    const memberId = req.params.id;
    const member = await Member.findById(memberId);
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

const updateMemberDetails = async (req, res) => {
    try {
        await connectDatabase();
        const memberId = req.params.id;
        const requestBody = req.body;
        console.log("Request Body: ", requestBody);
        const updatedMember = await Member.findByIdAndUpdate(
            memberId,
            { $set: { ...requestBody } },
            { new: true, runValidators: true }
        );

        if (!updatedMember) {
            return res.status(404).json({
                message: "Member not found",
                success: false,
            });
        }

        res.status(200).json({
            message: "Member's details changed successfully",
            success: true,
            updatedMember,
        });

    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message,
        });
    }
};

module.exports = { getAllMembers, registerNewMember, getSingleMember, updateMemberDetails };
