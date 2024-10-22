const connectDatabase = require("../config/db");
const Member = require("../models/Members");


const searchMembers = async (req, res) => {
    try {
        const { memberSearchQuery } = req.query;
        await connectDatabase();
        const members = await Member.find({
            $or: [
                { fullName: { $regex: memberSearchQuery, $options: 'i' } },
                { email: { $regex: memberSearchQuery, $options: 'i' } },
                { contactNo: { $regex: memberSearchQuery, $options: 'i' } },
            ]
        })
        res.status(200).json({
            members,
        });

    } catch (error) {
        console.log('Error: ', error);
    }
}

module.exports = { searchMembers }