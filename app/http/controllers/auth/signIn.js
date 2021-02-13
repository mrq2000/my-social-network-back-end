const Joi = require('joi');
const authService = require('../../services/auth');

async function validation(args) {
  try {
    const schema = Joi.object().keys({
      providerAccessToken: Joi.string().required(),
      providerName: Joi.valid(['GOOGLE']),
    });
    const params = {
      providerAccessToken: args.providerAccessToken,
      providerName: args.providerName,
    };
    return await Joi.validate(params, schema);
  } catch (error) {
    throw new Error(JSON.stringify({ error: 'Params error', status: 400 }));
  }
}

async function signIn(req, res) {
  try {
    await validation(req.body);
    const credentials = {
      providerName: req.body.providerName,
      providerAccessToken: req.body.providerAccessToken,
    };
    const responseData = await authService.signIn(credentials);
    return res.status(200).send(responseData);
  } catch (err) {
    const error = JSON.parse(err.message);
    return res.status(error.status).send(error);
  }
}

module.exports = signIn;
