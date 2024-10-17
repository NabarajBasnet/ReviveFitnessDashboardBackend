const express = require('express');
const { getAllMembers, registerNewMember, getSingleMember } = require('../controllers/memberControllers')

const router = express.Router();

router.route('/').get(getAllMembers)

router.route('/:id').get(getSingleMember)

// Register member route

router.route('/').post(registerNewMember);

module.exports = router
