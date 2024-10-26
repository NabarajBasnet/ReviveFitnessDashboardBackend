const express = require('express');
const { getLockerInformation, registerMemberLocker, updateMemberLocker, getAllLockers } = require('../controllers/lockerControllers');
const router = express.Router();

router.route('/').get(getAllLockers)

router.route('/:id').get(getLockerInformation);

router.route('/').post(registerMemberLocker);

router.route('/patch').put(updateMemberLocker);

module.exports = router;
