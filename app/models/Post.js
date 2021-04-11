/* eslint-disable global-require */
const { Model } = require('objection');

class Post extends Model {
  static get tableName() {
    return 'posts';
  }

  static get relationMappings() {
    const LikePost = require('./LikePost');

    return {
      likes: {
        relation: Model.HasManyRelation,
        modelClass: LikePost,
        join: {
          from: 'posts.id',
          to: 'like_post.post_id',
        },
      },
    };
  }
}

module.exports = Post;
