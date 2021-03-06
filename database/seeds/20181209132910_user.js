const userStatusEnum = require('../../app/enums/userStatus');

exports.seed = async (knex) => {
  await knex('users').insert([{
    email: 'user1@gmail.com',
    full_name: 'bot 1',
    gender: 1,
    birthday: '2000/03/02',
    province: 'Thành phố  Hà Nội',
    district: 'Đông Anh',
    status: userStatusEnum.ACTIVE,

    avatar_name: '',
    slogan: 'Trói em bằng cà vạt',
    location: '....',
  }, {
    email: 'user2@gmail.com',
    full_name: 'bot 2',
    gender: 1,
    birthday: '2000/03/02',
    province: 'Thành phố  Hà Nội',
    district: 'Đông Anh',
    status: userStatusEnum.ACTIVE,

    avatar_name: '',
    slogan: 'Trói em bằng cà vạt',
    location: '....',
  }, {
    email: 'user3@gmail.com',
    full_name: 'bot 3',
    gender: 1,
    birthday: '2000/03/02',
    province: 'Thành phố  Hà Nội',
    district: 'Đông Anh',
    status: userStatusEnum.ACTIVE,

    avatar_name: '',
    slogan: 'Trói em bằng cà vạt',
    location: '....',
  }, {
    email: 'user4@gmail.com',
    full_name: 'bot 4',
    gender: 1,
    birthday: '2000/03/02',
    province: 'Thành phố  Hà Nội',
    district: 'Đông Anh',
    status: userStatusEnum.ACTIVE,

    avatar_name: '',
    slogan: 'Trói em bằng cà vạt',
    location: '....',
  }, {
    email: 'user5@gmail.com',
    full_name: 'bot 5',
    gender: 1,
    birthday: '2000/03/02',
    province: 'Thành phố  Hà Nội',
    district: 'Đông Anh',
    status: userStatusEnum.ACTIVE,

    avatar_name: '',
    slogan: 'Trói em bằng cà vạt',
    location: '....',
  }, {
    email: 'user6@gmail.com',
    full_name: 'bot 6',
    gender: 1,
    birthday: '2000/03/02',
    province: 'Thành phố  Hà Nội',
    district: 'Đông Anh',
    status: userStatusEnum.ACTIVE,

    avatar_name: '',
    slogan: 'Trói em bằng cà vạt',
    location: '....',
  }, {
    email: 'user7@gmail.com',
    full_name: 'bot 1',
    gender: 1,
    birthday: '2000/03/02',
    province: 'Thành phố  Hà Nội',
    district: 'Đông Anh',
    status: userStatusEnum.ACTIVE,

    avatar_name: '',
    slogan: 'Trói em bằng cà vạt',
    location: '....',
  },
  ]);
};
