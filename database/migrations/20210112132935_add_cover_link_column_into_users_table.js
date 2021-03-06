exports.up = async (knex) => {
  await knex.schema.alterTable('users', (table) => {
    table.string('cover_name', 255).collate('utf8_general_ci').after('avatar_name');
  });
};

exports.down = async (knex) => {
  await knex.schema.table('users', (table) => {
    table.dropColumn('cover_name');
  });
};
