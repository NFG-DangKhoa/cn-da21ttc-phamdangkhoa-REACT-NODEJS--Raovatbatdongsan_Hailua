const express = require('express');
const router = express.Router();
const { sendOrderConfirmationEmail } = require('../../controllers/Gmail/emailController');

router.post('/send', sendOrderConfirmationEmail);

module.exports = router;
