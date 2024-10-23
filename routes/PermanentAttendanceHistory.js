const express = require('express');
const router = express.Router();
const {
    getPermanentMemberAttendanceHistory,
    postPermanentMemberAttendanceHistory } = require('../controllers/attendenceHistoryController')

router.route('/').get(getPermanentMemberAttendanceHistory);

router.route('/create').post(postPermanentMemberAttendanceHistory);

module.exports = router;
