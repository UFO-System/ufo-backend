const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/kitchen', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'kitchen.html'));
});

module.exports = router;