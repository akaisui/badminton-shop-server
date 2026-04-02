'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        id: 'de8640c2-d876-4209-8475-2a044ab1f652',
        name: 'Nguyên',
        email: 'anhlong@gmail.com',
        subject: 'support',
        message: 'Xin chào, tôi gặp sự cố khi đặt hàng online. Nhờ đội ngũ hỗ trợ kiểm tra giúp.',
        status: 'pending',
        admin_notes: null,
        responded_at: null,
        is_read: false,
        priority: 'medium',
        created_at: new Date('2025-07-26 15:28:16.84+07'),
        updated_at: new Date('2025-07-26 15:28:16.84+07'),
      },
      {
        id: '78ae2363-ad05-4889-82f5-7b00e89f4d16',
        name: 'Muông',
        email: 'muongthay28@gmail.com',
        subject: 'general',
        message: 'ấdfdf',
        status: 'resolved',
        admin_notes: null,
        responded_at: new Date('2025-07-25 01:53:33.927026+07'),
        is_read: true,
        priority: 'medium',
        created_at: new Date('2025-07-24 22:48:00.920642+07'),
        updated_at: new Date('2025-07-26 15:28:31.811+07'),
      },
    ];

    await queryInterface.bulkInsert('contacts', data, {});
    console.log('✅ Seeded {} rows into contacts', data.length);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('contacts', null, {});
  }
};
