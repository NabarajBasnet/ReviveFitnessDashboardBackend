const connectDatabase = require("../config/db");
const Member = require("../models/Members");
const SendQr = require("../services/Email/SendQr");


const sendQr = async (req, res) => {
    try {
        await connectDatabase();
        const reqBody = await req.body;
        const memberId = reqBody.id;

        // Find member
        const member = await Member.findById(memberId);
        await SendQr(member.email, memberId, member.fullName);

        if (!member) {
            res.status(400).json({
                message: 'User not found!',
                success: false
            });
        };

        res.status(200).json({
            message: `Qr send in email: ${member.email} successfully, Please check this email.`,
            success: true
        });

    } catch (error) {
        res.status(500).json({
            message: error,
            success: false
        });
    };
};

module.exports = sendQr;
