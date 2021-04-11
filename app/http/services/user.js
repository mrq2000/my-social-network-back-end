const { transaction } = require('objection');

const { User, Post } = require('../../models');
const { abort } = require('../../helpers/error');
const { getPresignedImageUrl } = require('../../helpers/image');
const postStatusEnum = require('../../enums/postStatus');
const postTypeEnum = require('../../enums/postType');

exports.getMyInformation = async (userId) => {
  const userInfo = await User
    .query()
    .findById(userId);

  if (!userInfo) return abort(400, 'User not found');

  const coverLink = userInfo.cover_name ? userInfo.cover_name : process.env.AWS_DEFAULT_COVER;
  const avatarLink = userInfo.avatar_name ? userInfo.avatar_name : process.env.AWS_DEFAULT_AVATAR;
  userInfo.cover_name = getPresignedImageUrl(coverLink);
  userInfo.avatar_name = getPresignedImageUrl(avatarLink);

  return userInfo;
};

exports.updateAvatar = async ({ userId, mainAvatar }) => {
  try {
    await transaction(User, Post, async (UserTrx, PostTrx) => {
      await UserTrx.query().findById(userId)
        .patch({
          avatar_name: mainAvatar,
        });
      await PostTrx.query().insert({
        user_id: userId,
        type: postTypeEnum.PUBLIC,
        status: postStatusEnum.OPEN,
        image_name: mainAvatar,
      });
    });
  } catch (error) {
    abort(500, 'Cannot update your avatar');
  }
};

exports.getUserInformation = async (userId) => {
  const userInfo = await User
    .query()
    .findById(userId);

  if (!userInfo) return abort(400, 'User not found');

  const coverLink = userInfo.cover_name ? userInfo.cover_name : process.env.AWS_DEFAULT_COVER;
  const avatarLink = userInfo.avatar_name ? userInfo.avatar_name : process.env.AWS_DEFAULT_AVATAR;
  userInfo.cover_name = getPresignedImageUrl(coverLink);
  userInfo.avatar_name = getPresignedImageUrl(avatarLink);

  return userInfo;
};

exports.getUserPosts = async ({ userId, limit, offset }) => {
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
