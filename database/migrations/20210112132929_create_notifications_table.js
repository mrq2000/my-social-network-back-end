exports.up = async (knex) => {
  await knex.schema.createTable('notifications', (table) => {
    table.increments('id');
    table.text('content').collate('utf8_general_ci').notNullable();
    table.text('image_link').collate('utf8_general_ci');
    table.tinyint('status', 1).unsigned().notNullable();

    table.timestamps(true, true);

    table.integer('user_id', 1).unsigned().references('users.id').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('notifications');
};
