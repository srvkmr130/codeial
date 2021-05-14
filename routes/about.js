const express = require('express');
const router = express.Router();

const aboutController = require('../controllers/about_controller');

router.get('/',aboutController.about);

module.exports = router;