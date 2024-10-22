const express = require('express');
const router = express.Router();
const {
    getTemporaryMemberAttendanceHistory,
    getPermanentMemberAttendanceHistory,
    postTemporaryMemberAttendanceHistory,
    postPermanentMemberAttendanceHistory } = require('../controllers/attendenceHistoryController')

router.route('/').get(getTemporaryMemberAttendanceHistory);

router.route('/').post(postTemporaryMemberAttendanceHistory);

router.route('/').get(getPermanentMemberAttendanceHistory);

router.route('/').post(postPermanentMemberAttendanceHistory);

module.exports = router;
