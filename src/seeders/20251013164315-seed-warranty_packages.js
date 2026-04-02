'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        id: '2e58f184-ec99-4dca-937e-4ec606064368',
        name: 'Gói Bảo Hành Cơ Bản',
        description: 'Điều kiện: sản phẩm hư do lỗi kỹ thuật từ nhà sản xuất (không do va chạm, đập đất...), Còn hóa đơn mua hàng, chưa thay dây/ép cước tại nơi khác với giày chưa thay đế.\\n⚠️ Không áp dụng cho các trường hợp va chạm, cố ý làm hỏng hoặc sửa chữa không chính hãng.',
        duration_months: 3,
        price: 300000.0,
        terms: '{}',
        coverage: '{"1 lần bảo hành miễn phí trong thời hạn","Hỗ trợ kiểm tra tình trạng vợt miễn phí","Ưu tiên xử lý bảo hành nhanh trong 3–5 ngày"}',
        is_active: true,
        sort_order: 0,
        created_at: new Date('2025-07-22 23:35:34.034+07'),
        updated_at: new Date('2025-07-23 00:13:39.041+07'),
      },
      {
        id: '03286eed-68d6-400c-b027-28473f98c2e6',
        name: 'Gói Bảo Hành Nâng Cao',
        description: 'Điều kiện: bao gồm lỗi kỹ thuật + lỗi do va chạm nhẹ trong thi đấu với giầy do cố ý làm rách, có đầy đủ hóa đơn mua hàng, dây đan tại cửa hàng chính hãng.',
        duration_months: 6,
        price: 500000.0,
        terms: '{}',
        coverage: '{"Tối đa 2 lần bảo hành trong thời hạn","Hỗ trợ thay dây miễn phí 1 lần","Kiểm tra và bảo trì vợt định kỳ","Xử lý trong 2–4 ngày làm việc"}',
        is_active: true,
        sort_order: 0,
        created_at: new Date('2025-07-22 23:45:10.847+07'),
        updated_at: new Date('2025-07-23 00:14:26.053+07'),
      },
    ];

    await queryInterface.bulkInsert('warranty_packages', data, {});
    console.log('✅ Seeded {} rows into warranty_packages', data.length);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('warranty_packages', null, {});
  }
};
