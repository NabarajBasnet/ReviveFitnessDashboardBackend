const express = require('express');
const router = express.Router();
const {
    getTemporaryMemberAttendanceHistory,
    postTemporaryMemberAttendanceHistory,
} = require('../controllers/attendenceHistoryController')

router.route('/').get(getTemporaryMemberAttendanceHistory);

router.route('/create').post(postTemporaryMemberAttendanceHistory);

module.exports = router;
