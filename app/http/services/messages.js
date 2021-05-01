const { Message, User } = require('../../models');
const { getPresignedImageUrl } = require('../../helpers/image');
const { abort } = require('../../helpers/error');

exports.getFriendMessages = async ({
  friendId, userId, cursor, limit,
}) => {
  const messagesQuery = Message.query()
    .where((builder) => builder.where('sender_id', userId).andWhere('receiver_id', friendId))
    .orWhere((builder) => builder.where('sender_id', friendId).andWhere('receiver_id', userId))
    .orderBy('id', 'desc')
    .limit(limit)
    .select('id', 'content', 'sender_id', 'created_at');

  if (cursor) {
    messagesQuery.where('id', '<', cursor);
  }

  const response = await messagesQuery;

  return {
    messages: response,
    nextCursor: response.length === limit ? response[response.length - 1].id : false,
  };
};
