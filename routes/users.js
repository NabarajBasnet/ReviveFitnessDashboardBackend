const express = require('express');
const auth = require('../middlewares/auth');

const { getAllUsers, createUser, updateUser, deleteUser, getSingleUser } = require('../controllers/userController');

const router = express.Router();

// router.use(auth);

router.route('/').get(getAllUsers);

router.route('/:id').get(getSingleUser);

router.route('/create').post(createUser);

router.route('/patch/:id').patch(updateUser);

router.route('/delete/:id').delete(deleteUser);

module.exports = router;
