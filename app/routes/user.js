const express = require('express');
const { user: userController } = require('../http/controllers');
const { auth } = require('../http/middlewares');

const router = express.Router();

router.get('/my-page', auth, userController.getMyPage);

module.exports = router;
