const express = require('express');
const { suggest: suggestController } = require('../http/controllers');
const { auth } = require('../http/middlewares');

const router = express.Router();

router.get('/suggest/my-friends', auth, suggestController.suggestMyFriend);

module.exports = router;
