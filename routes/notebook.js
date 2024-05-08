const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/notebook', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'notebook.html'));
});

module.exports = router;