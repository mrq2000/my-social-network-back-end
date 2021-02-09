const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.seed = async (knex) => {
  await knex('users').del();
  await knex('users').insert([{
    email: 'quocpham@gmail.com',
    password: await bcrypt.hash('123456', saltRounds),
    full_name: 'Phạm Hữu Anh Quốc',
  }]);
};
