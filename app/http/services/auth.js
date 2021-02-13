const axios = require('axios');

const { User } = require('../../models');
const { abort } = require('../../helpers/error');
const jwt = require('../../helpers/jwt');

const signInWithGoogle = async (providerAccessToken) => {
  try {
    const { data } = await axios(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${providerAccessToken}`);
    const { email } = data;
    if (!email) {
      abort(400, 'Fail To Login With Google');
    }

    const user = await User.query().findOne({ email });
    if (!user) {
      return { user: null };
    }
    const accessToken = await jwt.generate({ userId: user.id });

    return {
      user,
      accessToken,
    };
  } catch (e) {
    return abort(400, 'Fail To Login With Google');
  }
};

exports.signIn = async ({ providerAccessToken, providerName }) => {
  if (providerName === 'GOOGLE') {
    const user = await signInWithGoogle(providerAccessToken);
    return user;
  }

  return abort(400, 'Can\'t sign in with this provider');
};
