const { User } = require('../app/models');
const jwt = require('../app/helpers/jwt');
const { getPresignedImageUrl } = require('../app/helpers/image');

const users = {};

exports.getUser = async (token) => {
  const payload = await jwt.parse(token);

  if (payload === false) return false;
  const user = await User.query().findOne({ id: payload.userId }).select('id', 'full_name', 'avatar_name');
  if (!user) return false;
  const avatarLink = user.avatar_name ? user.avatar_name : process.env.AWS_DEFAULT_AVATAR;
  user.avatar_name = getPresignedImageUrl(avatarLink);
  return user;
};

exports.addUser = async (token, socketId) => {
  const user = await this.getUser(token);
  if (user) {
    users[user.id] = {
      online: true,
      socketId,
    };
  }
};

exports.removeUser = async (token, socketId) => {
  const user = await this.getUser(token);

  if (user) {
    users[user.id] = {
      online: false,
      socketId,
      lastOnline: Date.now(),
    };
  }
};

exports.checkUserList = async (userIds) => {
  const result = {};

  userIds.forEach((userId) => {
    if (users[userId]) {
      result[userId] = users[userId];
    } else {
      result[userId] = {
        online: false,
      };
    }
  });

  return result;
};

exports.getUserData = (userId) => users[userId];
