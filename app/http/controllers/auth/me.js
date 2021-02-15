const { getImage } = require('../../../helpers/image');

const me = async (req, res) => {
  const responseData = {
    id: req.user.id,
    full_name: req.user.full_name,
  };

  const avatarLink = req.user.avatar_link ? req.user.avatar_link : 'avatars/default_avatar.png';
  const avatar = await getImage(avatarLink);

  return res.status(200).send({ ...responseData, avatar });
};

module.exports = me;
