const express = require('express');
const router = express.Router()
const { getAllUsers, postUser, LogInUser } = require('../controllers/authControllers')

router.route('/users').get(getAllUsers);

router.route('/signup').post(postUser);

router.route('/login').post(LogInUser);

module.exports = router
