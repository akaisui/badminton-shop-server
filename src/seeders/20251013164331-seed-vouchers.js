'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        id: 'b00e4c7e-0e1d-4555-83b6-5816019ad822',
        code: 'WELCOME20',
        name: 'Chào mừng thành viên mới',
        description: 'Giảm 20% cho đơn hàng đầu tiên - Dành riêng cho khách hàng mới',
        type: 'percentage',
        value: 20.0,
        min_order_value: 200000.0,
        max_discount: 100000.0,
        start_date: new Date('2025-08-20 21:09:56.619+07'),
        end_date: new Date('2025-09-19 21:09:56.619+07'),
        is_active: true,
        usage_limit: null,
        used_count: 0,
        user_limit: 'first_time',
        applicable_categories: '[]',
        created_at: new Date('2025-08-20 21:09:56.623+07'),
        updated_at: new Date('2025-08-20 21:09:56.623+07'),
      },
      {
        id: '03d1414f-cd7e-439a-a2bb-d3b86f08666c',
        code: 'BADMINTON2025',
        name: 'Giảm 30% đơn hàng',
        description: 'Giảm 30% đơn hàng',
        type: 'percentage',
        value: 30.0,
        min_order_value: 200000.0,
        max_discount: 500000.0,
        start_date: new Date('2025-08-14 00:00:00+07'),
        end_date: new Date('2025-09-25 00:00:00+07'),
        is_active: true,
        usage_limit: 4,
        used_count: 2,
        user_limit: 'all',
        applicable_categories: null,
        created_at: new Date('2025-08-14 15:41:11.603+07'),
        updated_at: new Date('2025-08-22 17:57:35.92+07'),
      },
      {
        id: 'c101c43a-cbab-4302-ae90-eddf61493e51',
        code: 'GIAMGIA20',
        name: 'Giảm giá 20%',
        description: 'Giảm giá 20% cho sản phẩm',
        type: 'percentage',
        value: 20.0,
        min_order_value: 100000.0,
        max_discount: 500000.0,
        start_date: new Date('2025-09-01 00:00:00+07'),
        end_date: new Date('2025-09-27 00:00:00+07'),
        is_active: true,
        usage_limit: null,
        used_count: 2,
        user_limit: 'all',
        applicable_categories: null,
        created_at: new Date('2025-09-08 09:57:36.56+07'),
        updated_at: new Date('2025-09-08 11:16:54.212+07'),
      },
    ];

    await queryInterface.bulkInsert('vouchers', data, {});
    console.log('✅ Seeded {} rows into vouchers', data.length);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('vouchers', null, {});
  }
};
