const express = require('express');
const { getLockerInformation, registerMemberLocker, updateMemberLocker } = require('../controllers/lockerControllers');
const router = express.Router();

router.route('/').get(getLockerInformation);

router.route('/create').post(registerMemberLocker);

router.route('/patch').patch(updateMemberLocker);

module.exports = router;
