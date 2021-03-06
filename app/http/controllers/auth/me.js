const { getImage } = require('../../../helpers/image');

const me = async (req, res) => {
  const responseData = {
    id: req.user.id,
    full_name: req.user.full_name,
  };

  const avatarLink = req.user.avatar_name ? req.user.avatar_name : process.env.AWS_DEFAULT_AVATAR;
  const avatar = await getImage(avatarLink);

  return res.status(200).send({ ...responseData, avatar });
};

module.exports = me;
