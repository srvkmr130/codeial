const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');

router.get('/profile',usersController.profile);
router.get('/',usersController.home);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.use('/about',require('./about'));

router.post('/create',usersController.create);

module.exports = router;
