const express = require('express');
const { getAllMembers, registerNewMember, getSingleMember, updateMemberDetails } = require('../controllers/memberControllers');
const connectDatabase = require('../config/db');
const Member = require('../models/Members');

const router = express.Router();

router.route('/').get(getAllMembers)

router.route('/:id').get(getSingleMember)

// Register member route
router.route('/').post(registerNewMember);

// Change member details
router.route('/:id').patch(updateMemberDetails)

module.exports = router
