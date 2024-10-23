const express = require('express');
const { getAllUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.route('/').get(getAllUsers);

router.route('/create').post(createUser)

router.route('/patch').patch(updateUser)

router.route('/delete').delete(deleteUser)

module.exports = router;
