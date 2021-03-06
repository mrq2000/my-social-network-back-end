const Joi = require('joi');

const userService = require('../../services/user');
const { abort } = require('../../../helpers/error');

async function validation(postInfo) {
  try {
    const schema = Joi.object().keys({
      imageName: Joi.string().required(),
      userId: Joi.number().integer().min(1).required(),
    });

    return await Joi.validate(postInfo, schema);
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function updateAvatar(req, res) {
  const { imageName } = req;
  const userId = req.user.id;

  await validation({ imageName, userId });

  await userService.updateAvatar({ imageName, userId });
  return res.status(204).send();
}

module.exports = updateAvatar;
