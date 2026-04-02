'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        id: '1c67fce9-c7e8-4ae6-8f76-4d2ad0d1849c',
        product_id: 'a1e01f48-78e8-4713-8268-8a9f83874376',
        user_id: 'b224604e-7572-4cc3-a95f-14b5aa135978',
        rating: 4,
        title: 'Vợt sau 2 tuần ',
        content: 'Đánh ngon nha ae ',
        is_verified: true,
        likes: 1,
        dislikes: 0,
        images: '{}',
        created_at: new Date('2025-08-29 01:18:49.815+07'),
        updated_at: new Date('2025-09-08 03:50:36.828+07'),
      },
    ];

    await queryInterface.bulkInsert('reviews', data, {});
    console.log('✅ Seeded {} rows into reviews', data.length);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('reviews', null, {});
  }
};
