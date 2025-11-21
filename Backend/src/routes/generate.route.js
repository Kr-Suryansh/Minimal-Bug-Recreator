


const express = require('express');
const multer = require('multer');
const { handleGenerate } = require('../controllers/generate.controller');

const upload = multer({ dest: 'uploads/' });

const router = express.Router();
router.post('/api/generate', upload.single('projectZip'), handleGenerate);

module.exports = router;

