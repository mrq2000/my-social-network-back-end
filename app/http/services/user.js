const { User } = require('../../models');
const { abort } = require('../../helpers/error');
const { getPresignedImageUrl } = require('../../helpers/image');

const AVATAR_BUCKET = 'avatars';
const COVER_BUCKET = 'covers';

exports.getMyInformation = async (userId) => {
  const userInfo = await User
    .query()
    .findById(userId);

  if (!userInfo) return abort(400, 'User not found');

  const coverLink = `${COVER_BUCKET}/${userInfo.cover_name ? userInfo.cover_name : process.env.AWS_DEFAULT_COVER}`;
  const avatarLink = `${AVATAR_BUCKET}/${userInfo.avatar_name ? userInfo.avatar_name : process.env.AWS_DEFAULT_AVATAR}`;
  userInfo.cover_name = getPresignedImageUrl(coverLink);
  userInfo.avatar_name = getPresignedImageUrl(avatarLink);

  return userInfo;
};

exports.updateAvatar = async ({ userId, imageName }) => {
  const userInfo = await User
    .query()
    .findById(userId);

  if (!userInfo) return abort(400, 'User not found');

  await userInfo.$query().patch({
    avatar_name: imageName,
  });

  return userInfo;
};
