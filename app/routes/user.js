const express = require('express');
const { user: userController } = require('../http/controllers');
const { auth, uploadImage } = require('../http/middlewares');

const router = express.Router();

router.get('/my-page', auth, userController.getMyPage);
router.post('/me/update-avatar', auth, uploadImage().single('mainAvatar'),
  userController.updateAvatar);

module.exports = router;
