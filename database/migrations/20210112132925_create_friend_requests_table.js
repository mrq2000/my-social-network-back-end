exports.up = async (knex) => {
  await knex.schema.createTable('friend_requests', (table) => {
    table.increments('id');
    table.tinyint('status', 1).unsigned().notNullable();

    table.timestamps(true, true);

    table.integer('sender_id', 1).unsigned().references('users.id').notNullable();
    table.integer('receiver_id', 1).unsigned().references('users.id').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('friend_requests');
};
