const connectDatabase = require("../config/db");
const Member = require("../models/Members");

const validateQr = async (req, res) => {
    const memberId = req.params.id;

    await connectDatabase();

    const member = await Member.findById(memberId);
    console.log('Validating Member: ', member);

    res.status(200).json({
        message: 'Member found',
        member
    });

}

module.exports = {validateQr};
