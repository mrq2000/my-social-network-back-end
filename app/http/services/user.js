const { User } = require('../../models');
const { abort } = require('../../helpers/error');
const { getPresignedImageUrl } = require('../../helpers/image');

exports.getMyInformation = async (userId) => {
  const userInfo = await User
    .query()
    .findById(userId);

  if (!userInfo) return abort(400, 'User not found');

  const coverLink = userInfo.cover_link ? userInfo.cover_link : process.env.AWS_DEFAULT_COVER;
  const avatarLink = userInfo.avatar_link ? userInfo.avatar_link : process.env.AWS_DEFAULT_AVATAR;
  userInfo.cover_link = getPresignedImageUrl(coverLink);
  userInfo.avatar_link = getPresignedImageUrl(avatarLink);

  return userInfo;
};
