exports.up = async (knex) => {
  await knex.schema.createTable('chats', (table) => {
    table.increments('id');
    table.text('content').collate('utf8_general_ci').notNullable();
    table.text('attach_name').collate('utf8_general_ci').notNullable();

    table.integer('sender_id', 1).unsigned().references('users.id').notNullable();
    table.integer('receiver_id', 1).unsigned().references('users.id').notNullable();

    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('chats');
};
