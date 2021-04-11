exports.up = async (knex) => {
  await knex.schema.createTable('share', (table) => {
    table.increments('id');

    table.integer('post_id', 1).unsigned().references('posts.id').notNullable();
    table.integer('user_id', 1).unsigned().references('users.id').notNullable();

    table.timestamps(true, true);

    table.index('user_id');
    table.index('post_id');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('share');
};
