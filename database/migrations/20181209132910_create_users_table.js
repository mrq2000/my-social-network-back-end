exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('email', 127).collate('latin1_general_ci').notNullable();
    table.string('full_name', 127).collate('utf8_general_ci').notNullable();
    table.tinyint('gender', 1).unsigned().notNullable();
    table.date('birthday').notNullable();
    table.string('province', 63).collate('utf8_general_ci').notNullable();
    table.string('district', 63).collate('utf8_general_ci').notNullable();
    table.tinyint('status', 1).unsigned().notNullable();

    table.string('avatar_name', 255).collate('utf8_general_ci');
    table.string('slogan', 255).collate('utf8_general_ci');
    table.string('location', 255).collate('utf8_general_ci');

    table.timestamps(true, true);

    table.unique(['email'], 'email');
    table.index('email');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('users');
};
