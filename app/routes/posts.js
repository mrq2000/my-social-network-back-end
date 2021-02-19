const express = require('express');
const { posts: postsController } = require('../http/controllers');
const { auth } = require('../http/middlewares');

const router = express.Router();

router.post('/posts', auth, postsController.addPost);

module.exports = router;
