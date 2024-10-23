const express = require('express');
const sendQr = require('../controllers/sendQrController');

const router = express.Router();

router.route('/send-qr').post(sendQr);

module.exports = router