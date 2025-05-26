const express = require('express');
const router  = express.Router();
const { handleIncoming } = require('../controllers/webhookController');

router.post('/', handleIncoming);

module.exports = router;