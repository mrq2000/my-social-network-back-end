const { Post } = require('../../models');
const { abort } = require('../../helpers/error');

exports.addPost = async ({ userId, content, type }) => {
  try {
    await Post.query().insert({
      content, type, user_id: userId,
    });
  } catch (error) {
    abort(400, 'Cannot add post');
  }
};
