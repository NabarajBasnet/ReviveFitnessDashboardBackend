const express = require('express');
const router = express.Router()
const { getAllUsers, postUser } = require('../controllers/usersControllers')

router.route('/').get(getAllUsers);

router.route('/').post(postUser);

module.exports = router
