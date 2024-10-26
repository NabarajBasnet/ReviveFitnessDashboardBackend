const express = require('express');
const sendQr = require('../controllers/sendQrController');

const router = express.Router();

router.route('/').post(sendQr);

module.exports = router