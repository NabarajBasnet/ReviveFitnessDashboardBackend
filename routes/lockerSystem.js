const express = require('express');
const { getLockerInformation, registerMemberLocker, getAllLockers, resetLocker } = require('../controllers/lockerControllers');
const router = express.Router();

router.route('/').get(getAllLockers)

router.route('/:id').get(getLockerInformation);

router.route('/put').put(registerMemberLocker);

router.route('/patch/:id').patch(resetLocker);

module.exports = router;
