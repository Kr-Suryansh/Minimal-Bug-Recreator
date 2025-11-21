
const express = require('express');
const router = express.Router();
const { generateMRE } = require('../controllers/generate.controller');

router.post('/', generateMRE);

module.exports = router;