const Locker = require('../models/Lockers')
const ConnectDatabase = require('../config/db');

const getAllLockers = async (req, res) => {
    try {
        await ConnectDatabase();

        for (let i = 1; i <= 20; i++) {
            const existingLocker = await Locker.findOne({ lockerNumber: i });
            if (!existingLocker) {
                await Locker.create({
                    lockerNumber: i,
                    memberId: '',
                    memberName: '',
                    renewDate: null,
                    duration: '',
                    expireDate: null,
                    fee: '',
                    paymentMethod: 'Cash',
                    referenceCode: '',
                    receiptNo: '',
                    isAssigned: false
                });
            }
        }

        const lockers = await Locker.find();
        const totalLockers = await Locker.countDocuments();

        res.status(200).json({
            message: 'Lockers found',
            success: true,
            lockers,
            totalLockers,
        });

    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({
            message: 'An error occurred',
            success: false,
            error
        });
    }
};

const getLockerInformation = async (req, res) => {
    try {
        await ConnectDatabase();
        const lockerId = req.params.id;
        const lockerDetails = await Locker.findById(lockerId);
        if (!lockerDetails) {
            res.status(400).json({
                message: "Locker details not found",
                success: false
            })
        }

        res.status(200).json({
            message: "Locker details found",
            success: true,
            lockerDetails
        })

    } catch (error) {
        console.log('Error: ', error);
    }
}

const registerMemberLocker = async (req, res) => {
    try {
        await ConnectDatabase();

        const requestBody = req.body;

        const {
            lockerId,
            lockerNumber,
            memberId,
            memberName,
            renewDate,
            duration,
            expireDate,
            fee,
            paymentMethod,
            referenceCode,
            receiptNo
        } = requestBody;

        const locker = await Locker.findById(lockerId);

        if (!locker) {
            res.status(404).json({ success: false, message: 'Locker not found' });
        }

        if (locker.isAssigned) {
            res.status(400).json({ success: false, message: 'Locker is already assigned' });
        }

        locker.isAssigned = true;
        locker.lockerNumber = lockerNumber;
        locker.memberId = memberId;
        locker.memberName = memberName;
        locker.renewDate = renewDate || locker.renewDate;
        locker.duration = duration || locker.duration;
        locker.expireDate = expireDate;
        locker.fee = fee;
        locker.paymentMethod = paymentMethod;
        locker.referenceCode = referenceCode;
        locker.receiptNo = receiptNo;

        await locker.save();

        res.status(200).json({ success: true, message: 'Locker assigned successfully', locker });

    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const resetLocker = async (req, res) => {
    try {
        await ConnectDatabase();

        const lockerId = await req.params.id;
        const locker = await Locker.findById(lockerId);

        if (!locker) {
            res.status(400).json({
                message: "Locker not found",
                success: false
            })
        }

        locker.memberId = undefined;
        locker.memberName = undefined;
        locker.renewDate = undefined;
        locker.duration = undefined;
        locker.expireDate = undefined;
        locker.fee = undefined;
        locker.paymentMethod = undefined;
        locker.referenceCode = undefined;
        locker.receiptNo = undefined;
        locker.isAssigned = false;
        locker.status = 'Empty';

        await locker.save();

        res.status(200).json({
            message: "Locker is empty now",
            success: true,
        });

    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports = { getAllLockers, getLockerInformation, registerMemberLocker, resetLocker };
