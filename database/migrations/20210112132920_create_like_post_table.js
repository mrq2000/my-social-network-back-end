exports.up = async (knex) => {
  await knex.schema.createTable('like_post', (table) => {
    table.increments('id');
    table.tinyint('type', 1).unsigned().notNullable();

    table.timestamps(true, true);

    table.integer('post_id', 1).unsigned().references('posts.id').notNullable();
    table.integer('user_id', 1).unsigned().references('users.id').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('like_post');
};
