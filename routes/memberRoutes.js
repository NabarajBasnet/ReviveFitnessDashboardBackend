const express = require('express');
const { getAllMembers, registerNewMember } = require('../controllers/memberControllers')

const router = express.Router();

router.route('/').get(getAllMembers)

// Register member route

router.route('/').post(registerNewMember);

module.exports = router
