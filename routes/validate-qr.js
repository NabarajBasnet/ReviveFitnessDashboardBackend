const express = require('express');
const router = express.Router();
const { validateQr } = require('../controllers/validteQrController');

router.route('/:id').post(validateQr);

module.exports = router;
