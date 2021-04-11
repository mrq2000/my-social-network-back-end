exports.up = async (knex) => {
  await knex.schema.createTable('posts', (table) => {
    table.increments('id');
    table.text('content').collate('utf8_general_ci');
    table.text('image_name').collate('utf8_general_ci');

    table.integer('user_id', 1).unsigned().references('users.id').notNullable();
    table.tinyint('status', 1).unsigned().notNullable();

    table.timestamps(true, true);

    table.index('user_id');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('posts');
};
