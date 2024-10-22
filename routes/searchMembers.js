const express = require('express');
const { searchMembers } = require('../controllers/searchMembersControllers');

const router = express.Router();

router.route('/').get(searchMembers);

module.exports = router;
