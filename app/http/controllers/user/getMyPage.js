const userService = require('../../services/user');

async function getMyPage(req, res) {
  const userId = req.user.id;
  const responseData = await userService.getMyInformation(userId);

  return res.status(200).send(responseData);
}

module.exports = getMyPage;
