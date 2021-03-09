const { Post } = require('../../models');
const { abort } = require('../../helpers/error');
const postStatusEnum = require('../../enums/postStatus');
const { getPresignedImageUrl } = require('../../helpers/image');

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

  const response = posts.map((post) => {
    let imgSign = null;
    if (post.image_name) {
      imgSign = getPresignedImageUrl(post.image_name);
    }
    return {
      ...post, image_name: imgSign,
    };
  });

  return response;
};
