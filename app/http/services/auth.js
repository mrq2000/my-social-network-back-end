const axios = require('axios');
const { transaction } = require('objection');

const { User } = require('../../models');
const { abort } = require('../../helpers/error');
const jwt = require('../../helpers/jwt');

const checkGoogleToken = async (providerAccessToken) => {
  try {
    const { data } = await axios(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${providerAccessToken}`);
    const { email } = data;
    if (!email) {
      abort(400, 'Cannot connect to your google account');
    }

    return email;
  } catch (e) {
    return abort(400, 'Something went wrong');
  }
};

const signInWithGoogle = async (providerAccessToken) => {
  try {
    const email = await checkGoogleToken(providerAccessToken);

    const user = await User.query().findOne({ email });
    if (!user) {
      return { email, hasAccount: false };
    }

    const accessToken = jwt.generate({ userId: user.id });

    return {
      accessToken,
    };
  } catch (e) {
    return abort(400, 'Fail To Login With Google Account');
  }
};

exports.signIn = async ({ providerAccessToken, providerName }) => {
  if (providerName === 'GOOGLE') {
    const user = await signInWithGoogle(providerAccessToken);
    return user;
  }

  return abort(400, 'Can\'t sign in with this provider');
};

exports.signUp = async ({
  providerAccessToken, fullName, gender, birthday, province, district, location,
}) => {
  try {
    const email = await checkGoogleToken(providerAccessToken);
    let accessToken = '';

    const user = await User.query().findOne({ email });
    if (user) {
      return abort(400, 'Account already exists');
    }
    await transaction(User, async (UserTrx) => {
      const userInfo = await UserTrx.query().insert({
        email,
        full_name: fullName,
        gender,
        birthday,
        province,
        district,
        location,
      });

      accessToken = jwt.generate({ userId: userInfo.id });
    });

    return {
      accessToken,
    };
  } catch (e) {
    return abort(400, 'Fail To Sign Up With Google Account');
  }
};
