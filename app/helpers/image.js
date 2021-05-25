const s3 = require('./s3');

const encode = (data) => {
  const buf = Buffer.from(data);
  const base64 = buf.toString('base64');
  return base64;
};

exports.getImage = async (key) => {
  let img = null;

  try {
    const params = {
      Bucket: 'images',
      Key: key,
    };

    img = encode((await s3.getObject(params).promise()).Body);
  } catch (error) {
    return null;
  }

  return img;
};

exports.getPresignedImageUrl = (key, expires = 30000) => {
  try {
    const url = s3
      .getSignedUrl('getObject', {
        Bucket: 'images',
        Key: key,
        Expires: expires,
      });

    return url;
  } catch (e) {
    return null;
  }
};
