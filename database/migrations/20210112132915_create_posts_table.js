exports.up = async (knex) => {
  await knex.schema.createTable('posts', (table) => {
    table.increments('id');
    table.text('content').collate('utf8_general_ci').notNullable();
    table.text('image_link').collate('utf8_general_ci');

    table.integer('user_id', 1).unsigned().references('users.id').notNullable();

    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('posts');
};
