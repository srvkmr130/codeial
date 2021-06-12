const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/',homeController.index);
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.use('/users',require('./users'));

router.use('/api',require('./api'));

module.exports = router;