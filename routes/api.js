const express = require('express');
const router = express.Router();

// API post로 받아오기
router.post('/api', function(req, res) {
  const data = req.body;
  console.log(data);
});

module.exports = router;