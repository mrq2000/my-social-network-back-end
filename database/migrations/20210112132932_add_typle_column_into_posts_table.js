exports.up = async (knex) => {
  await knex.schema.alterTable('posts', (table) => {
    table.tinyint('type', 1).unsigned().notNullable().after('content');
  });
};

exports.down = async (knex) => {
  await knex.schema.table('posts', (table) => {
    table.dropColumn('type');
  });
};
