const { Post } = require('../../models');
const { abort } = require('../../helpers/error');
const postStatusEnum = require('../../enums/postStatus');

exports.addPost = async ({ userId, content, type }) => {
  try {
    await Post.query().insert({
      user_id: userId,
      content,
      type,
      status: postStatusEnum.OPEN,
    });
  } catch (error) {
    abort(400, 'Cannot add post');
  }
};

exports.getMyPosts = async ({ userId, limit, offset }) => {
  const posts = await Post.query()
    .where({ user_id: userId })
    .andWhereNot('status', postStatusEnum.CLOSED)
    .limit(limit)
    .offset(offset)
    .orderBy('id', 'desc');

  return posts;
};
