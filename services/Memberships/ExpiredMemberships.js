const cron = require('node-cron');
const Member = require('../../models/Members');
const connectDatabase = require('../../config/db');

const updateMembershipStatus = async () => {
    try {
        await connectDatabase();
        const todaysDate = new Date();

        const expiredMemberships = await Member.updateMany(
            {
                membershipExpireDate: { $lt: todaysDate },
                status: 'Active'
            },
            {
                $set: { status: 'Inactive' }
            }
        );
        console.log('Expired Memberships Updated: ', expiredMemberships.modifiedCount);
    } catch (error) {
        console.log('Error in updating membership status: ', error);
    }
};

module.exports = updateMembershipStatus;
