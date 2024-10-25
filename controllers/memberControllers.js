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
    const totalActiveMembers = await Member.countDocuments({ status: 'Active' });
    const totalInactiveMembers = await Member.countDocuments({ status: 'Inactive' });

    const currentDate = new Date();
    let totalActiveMembersPastWeek = 0;

    for (let i = 0; i < 7; i++) {
        const startOfDay = new Date(currentDate);
        startOfDay.setDate(currentDate.getDate() - i);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(startOfDay);
        endOfDay.setHours(23, 59, 59, 999);

        const activeMembersOnDay = await Member.countDocuments({
            status: 'Active',
            createdAt: { $gte: startOfDay, $lt: endOfDay }
        });

        totalActiveMembersPastWeek += activeMembersOnDay;
    }

    const dailyAverageActiveMembers = (totalActiveMembersPastWeek / 7).toFixed(2);

    res.status(200).json({
        message: 'Members found',
        members,
        totalMembers,
        totalPages,
        totalActiveMembers,
        totalInactiveMembers,
        dailyAverageActiveMembers: parseFloat(dailyAverageActiveMembers) // Convert back to number
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
        await MemberRegistrationEmail(savedMember.email, savedMember._id, savedMember.fullName, savedMember.membershipOption, savedMember.membershipType, savedMember.membershipDuration, savedMember.membershipDate, savedMember.membershipRenewDate, savedMember.membershipExpireDate, savedMember.contactNo, savedMember.dob, savedMember.address, savedMember.finalAmmount, savedMember.paidAmmount, savedMember.dueAmmount)
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
        res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message,
        });
    }
};

module.exports = { getAllMembers, registerNewMember, getSingleMember, updateMemberDetails };
