exports.up = async (knex) => {
  await knex.schema.alterTable('messages', (table) => {
    table.text('attach_name').collate('utf8_general_ci').alter();
  });
};

exports.down = async () => {
};
