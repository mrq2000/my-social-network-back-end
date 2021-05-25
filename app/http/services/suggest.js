const { raw } = require('objection');

const { FriendRequest, User } = require('../../models');
const friendRequestStatus = require('../../enums/friendRequestStatus');
const { getPresignedImageUrl } = require('../../helpers/image');

exports.suggestMyFriend = async ({
  keyword, offset, limit, userId,
}) => {
  const friendObj = await FriendRequest.query()
    .joinRelated('[sender, receiver]')
    .where('friend_requests.status', friendRequestStatus.ACCEPTED)
    .where((builder) => builder.where('sender_id', userId)
      .orWhere('receiver_id', userId))
    .andWhere(raw(`CASE sender_id WHEN ${userId} THEN receiver.full_name  ELSE sender.full_name END`), 'like', `%${keyword}%`)
    .limit(limit)
    .offset(offset)
    .orderBy('friend_requests.id', 'desc')
    .select(raw(`CASE sender_id WHEN ${userId} THEN receiver.avatar_name  ELSE sender.avatar_name END as avatar_name`))
    .select(raw(`CASE sender_id WHEN ${userId} THEN receiver.full_name  ELSE sender.full_name END as full_name`))
    .select(raw(`CASE sender_id WHEN ${userId} THEN receiver_id  ELSE sender_id END as id`));

  const friends = friendObj.map((friend) => {
    let imgSign = null;
    if (friend.avatar_name) {
      imgSign = getPresignedImageUrl(friend.avatar_name);
    } else {
      imgSign = getPresignedImageUrl(process.env.AWS_DEFAULT_AVATAR);
    }
    return {
      ...friend, avatar_name: imgSign,
    };
  });

  return friends;
};

exports.suggestMyFriend = async ({
  keyword, offset, limit, userId,
}) => {
  const friendObj = await FriendRequest.query()
    .joinRelated('[sender, receiver]')
    .where('friend_requests.status', friendRequestStatus.ACCEPTED)
    .where((builder) => builder.where('sender_id', userId)
      .orWhere('receiver_id', userId))
    .andWhere(raw(`CASE sender_id WHEN ${userId} THEN receiver.full_name  ELSE sender.full_name END`), 'like', `%${keyword}%`)
    .limit(limit)
    .offset(offset)
    .orderBy('friend_requests.id', 'desc')
    .select(raw(`CASE sender_id WHEN ${userId} THEN receiver.avatar_name  ELSE sender.avatar_name END as avatar_name`))
    .select(raw(`CASE sender_id WHEN ${userId} THEN receiver.full_name  ELSE sender.full_name END as full_name`))
    .select(raw(`CASE sender_id WHEN ${userId} THEN receiver_id  ELSE sender_id END as id`));

  const friends = friendObj.map((friend) => {
    let imgSign = null;
    if (friend.avatar_name) {
      imgSign = getPresignedImageUrl(friend.avatar_name);
    } else {
      imgSign = getPresignedImageUrl(process.env.AWS_DEFAULT_AVATAR);
    }
    return {
      ...friend, avatar_name: imgSign,
    };
  });

  return friends;
};

exports.suggestUser = async ({
  keyword, offset, limit, userId,
}) => {
  const userSuggest = await User.query()
    .whereNot('id', userId)
    .where((builder) => builder.where('full_name', 'like', `%${keyword}%`))
    .withGraphFetched('meSendRequest')
    .modifyGraph('meSendRequest', (builder) => {
      builder.where('receiver_id', userId).select('id', 'status');
    })
    .withGraphFetched('meReceiveRequest')
    .modifyGraph('meReceiveRequest', (builder) => {
      builder.where('sender_id', userId).select('id', 'status');
    })
    .limit(limit)
    .offset(offset);

  const users = userSuggest.map((user) => {
    let imgSign = null;
    if (user.avatar_name) {
      imgSign = getPresignedImageUrl(user.avatar_name);
    } else {
      imgSign = getPresignedImageUrl(process.env.AWS_DEFAULT_AVATAR);
    }
    return {
      ...user, avatar_name: imgSign,
    };
  });

  return users;
};
