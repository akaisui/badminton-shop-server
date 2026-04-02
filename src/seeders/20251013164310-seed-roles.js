'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        id: 'dcf884e4-88ab-499a-adf1-7c0f44b30cb7',
        name: 'Quản lý',
        description: 'Quản lý cấp trung - Quản lý sản phẩm, đơn hàng và danh mục',
        created_at: new Date('2025-08-03 23:01:29.556212+07'),
        updated_at: new Date('2025-08-03 23:01:29.556212+07'),
      },
      {
        id: '661c972f-81a7-4244-bfa4-55bdab0bd834',
        name: 'Biên tập viên',
        description: 'Biên tập viên - Quản lý nội dung và tin tức',
        created_at: new Date('2025-08-03 23:01:29.556212+07'),
        updated_at: new Date('2025-08-03 23:01:29.556212+07'),
      },
      {
        id: '2e388dbd-c75c-4b05-bc91-73ff0db4835f',
        name: 'Nhân viên CSKH',
        description: 'Nhân viên chăm sóc khách hàng - Xử lý đơn hàng và liên hệ',
        created_at: new Date('2025-08-03 23:01:29.556212+07'),
        updated_at: new Date('2025-08-03 23:01:29.556212+07'),
      },
      {
        id: 'c3f8dffb-15c4-4477-b086-7ba77ef7abf3',
        name: 'Người kiểm duyệt',
        description: 'Người kiểm duyệt - Chỉ xem và duyệt nội dung',
        created_at: new Date('2025-08-03 23:01:29.556212+07'),
        updated_at: new Date('2025-08-03 23:01:29.556212+07'),
      },
    ];

    await queryInterface.bulkInsert('roles', data, {});
    console.log('✅ Seeded {} rows into roles', data.length);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
