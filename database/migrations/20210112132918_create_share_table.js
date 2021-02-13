exports.up = async (knex) => {
  await knex.schema.createTable('share', (table) => {
    table.increments('id');

    table.timestamps(true, true);

    table.integer('post_id', 1).unsigned().references('posts.id').notNullable();
    table.integer('user_id', 1).unsigned().references('users.id').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('share');
};
