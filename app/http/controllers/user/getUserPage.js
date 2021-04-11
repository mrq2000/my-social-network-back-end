const Joi = require('joi');

const userService = require('../../services/user');
const friendService = require('../../services/friends');
const { abort } = require('../../../helpers/error');

async function validation(userInfo) {
  try {
    const schema = Joi.object().keys({
      userId: Joi.number().integer().min(1).required(),
    });

    return await Joi.validate(userInfo, schema);
  } catch (error) {
    return abort(400, 'Params error');
  }
}
async function getUserPage(req, res) {
  const userId = Number(req.params.userId);
  await validation({ userId });

  const responseData = await userService.getUserInformation(userId);
  const friendInfo = await friendService.getFriends(userId);

  return res.status(200).send({ ...responseData, ...friendInfo });
}

module.exports = getUserPage;
