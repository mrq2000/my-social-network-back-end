exports.up = async (knex) => {
  await knex.schema.createTable('comments', (table) => {
    table.increments('id');
    table.text('content').collate('utf8_general_ci').notNullable();
    table.text('image_name').collate('utf8_general_ci').notNullable();

    table.integer('post_id', 1).unsigned().references('posts.id').notNullable();
    table.integer('user_id', 1).unsigned().references('users.id').notNullable();
    table.integer('relate_comment_id', 1).unsigned().references('comments.id');

    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('comments');
};
