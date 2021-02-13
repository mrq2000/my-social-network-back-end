exports.up = async (knex) => {
  await knex.schema.createTable('posts', (table) => {
    table.increments('id');
    table.text('content').collate('utf8_general_ci').notNullable();
    table.text('image_link').collate('utf8_general_ci');

    table.timestamps(true, true);

    table.integer('user_id', 1).unsigned().references('users.id').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('posts');
};
