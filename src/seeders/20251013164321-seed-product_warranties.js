'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        id: 'ce3986d0-ae34-454c-9a23-9dae78ce1887',
        product_id: '3d0c1e56-d010-4bb4-b626-1bf7d9509ac2',
        warranty_package_id: '2e58f184-ec99-4dca-937e-4ec606064368',
        is_default: true,
        created_at: new Date('2025-07-23 00:20:43.37+07'),
        updated_at: new Date('2025-07-23 00:20:43.37+07'),
      },
      {
        id: 'acb24055-106c-4b07-bc52-94907ee862f1',
        product_id: '3d0c1e56-d010-4bb4-b626-1bf7d9509ac2',
        warranty_package_id: '03286eed-68d6-400c-b027-28473f98c2e6',
        is_default: false,
        created_at: new Date('2025-07-23 00:20:43.37+07'),
        updated_at: new Date('2025-07-23 00:20:43.37+07'),
      },
      {
        id: 'd4623c1d-30be-4d7f-aeac-c6e12bc16f0e',
        product_id: '4ab339a0-7116-46a5-a255-4b40ce73eb35',
        warranty_package_id: '2e58f184-ec99-4dca-937e-4ec606064368',
        is_default: true,
        created_at: new Date('2025-07-25 14:32:58.613+07'),
        updated_at: new Date('2025-07-25 14:32:58.613+07'),
      },
      {
        id: '6e7a14df-5caf-4410-8a5f-f79c11a6ef1b',
        product_id: 'd01eab7f-2b8a-46bb-b14c-b7875f7d7613',
        warranty_package_id: '2e58f184-ec99-4dca-937e-4ec606064368',
        is_default: true,
        created_at: new Date('2025-07-25 15:34:36.855+07'),
        updated_at: new Date('2025-07-25 15:34:36.855+07'),
      },
      {
        id: '7a56be8e-8ed9-4084-9e38-37278be5688d',
        product_id: 'd01eab7f-2b8a-46bb-b14c-b7875f7d7613',
        warranty_package_id: '03286eed-68d6-400c-b027-28473f98c2e6',
        is_default: false,
        created_at: new Date('2025-07-25 15:34:36.855+07'),
        updated_at: new Date('2025-07-25 15:34:36.855+07'),
      },
      {
        id: '251ef7c2-940a-4cb3-bb79-a3df819b8147',
        product_id: 'cdaa849b-ac2b-4e6e-84b1-3e0e062e7f93',
        warranty_package_id: '2e58f184-ec99-4dca-937e-4ec606064368',
        is_default: true,
        created_at: new Date('2025-07-28 20:47:40.224+07'),
        updated_at: new Date('2025-07-28 20:47:40.224+07'),
      },
      {
        id: 'db2755dd-37d0-4974-a80a-25fb611d87d5',
        product_id: 'b6ff2a2c-9419-4ef4-9d3b-4cf1828b73eb',
        warranty_package_id: '2e58f184-ec99-4dca-937e-4ec606064368',
        is_default: true,
        created_at: new Date('2025-07-29 00:31:34.412+07'),
        updated_at: new Date('2025-07-29 00:31:34.412+07'),
      },
      {
        id: 'ed468beb-99f3-405a-a759-364e4547b6f3',
        product_id: 'fb242dd7-b66e-4a06-92ff-d67f7f0ee1e3',
        warranty_package_id: '2e58f184-ec99-4dca-937e-4ec606064368',
        is_default: true,
        created_at: new Date('2025-07-29 00:42:58.9+07'),
        updated_at: new Date('2025-07-29 00:42:58.9+07'),
      },
      {
        id: '3a647137-166d-4642-aa55-0e0f72fef250',
        product_id: 'fb242dd7-b66e-4a06-92ff-d67f7f0ee1e3',
        warranty_package_id: '03286eed-68d6-400c-b027-28473f98c2e6',
        is_default: false,
        created_at: new Date('2025-07-29 00:42:58.9+07'),
        updated_at: new Date('2025-07-29 00:42:58.9+07'),
      },
      {
        id: '5ace74b6-75f6-41f9-b8a9-07a17c051c2b',
        product_id: 'a1e01f48-78e8-4713-8268-8a9f83874376',
        warranty_package_id: '2e58f184-ec99-4dca-937e-4ec606064368',
        is_default: true,
        created_at: new Date('2025-07-29 00:55:29.738+07'),
        updated_at: new Date('2025-07-29 00:55:29.738+07'),
      },
      {
        id: '88038737-1823-4b99-8693-1b95d87e1682',
        product_id: 'a1e01f48-78e8-4713-8268-8a9f83874376',
        warranty_package_id: '03286eed-68d6-400c-b027-28473f98c2e6',
        is_default: false,
        created_at: new Date('2025-07-29 00:55:29.738+07'),
        updated_at: new Date('2025-07-29 00:55:29.738+07'),
      },
      {
        id: '7e34d1e0-04ca-4fd4-ac8d-9d68c5509de4',
        product_id: 'abde62b1-9f97-4688-9b47-d2144a1b4833',
        warranty_package_id: '2e58f184-ec99-4dca-937e-4ec606064368',
        is_default: true,
        created_at: new Date('2025-07-29 03:29:38.143+07'),
        updated_at: new Date('2025-07-29 03:29:38.143+07'),
      },
      {
        id: '923e8756-cc70-4ae1-986b-ef6bbfea334d',
        product_id: 'abde62b1-9f97-4688-9b47-d2144a1b4833',
        warranty_package_id: '03286eed-68d6-400c-b027-28473f98c2e6',
        is_default: false,
        created_at: new Date('2025-07-29 03:29:38.144+07'),
        updated_at: new Date('2025-07-29 03:29:38.144+07'),
      },
      {
        id: '47c9b121-314e-4686-9ea5-c569b4d7da3b',
        product_id: '0e701196-99f2-4337-9e87-c6e77f2f336d',
        warranty_package_id: '03286eed-68d6-400c-b027-28473f98c2e6',
        is_default: true,
        created_at: new Date('2025-07-29 09:55:00.041+07'),
        updated_at: new Date('2025-07-29 09:55:00.041+07'),
      },
      {
        id: '324fc20f-c626-4819-a54a-6e43f7392c7f',
        product_id: 'cfba0aeb-97bd-42da-8f60-534cf2e1862a',
        warranty_package_id: '2e58f184-ec99-4dca-937e-4ec606064368',
        is_default: true,
        created_at: new Date('2025-07-29 09:55:26.612+07'),
        updated_at: new Date('2025-07-29 09:55:26.612+07'),
      },
      {
        id: 'f7dca7a4-cb65-46d2-83d5-6b9306b9361d',
        product_id: 'cfba0aeb-97bd-42da-8f60-534cf2e1862a',
        warranty_package_id: '03286eed-68d6-400c-b027-28473f98c2e6',
        is_default: false,
        created_at: new Date('2025-07-29 09:55:26.613+07'),
        updated_at: new Date('2025-07-29 09:55:26.613+07'),
      },
      {
        id: '9abe6a49-3c52-4d59-88e2-e5fb3edcc564',
        product_id: 'edbb47c6-138a-4043-9631-eb8355c42b18',
        warranty_package_id: '2e58f184-ec99-4dca-937e-4ec606064368',
        is_default: true,
        created_at: new Date('2025-08-06 05:31:34.697+07'),
        updated_at: new Date('2025-08-06 05:31:34.697+07'),
      },
      {
        id: 'c96c86f7-6941-4b58-bc84-11403d58391d',
        product_id: '413ca417-8eb1-4848-a003-a634905120aa',
        warranty_package_id: '03286eed-68d6-400c-b027-28473f98c2e6',
        is_default: false,
        created_at: new Date('2025-09-06 23:55:28.219+07'),
        updated_at: new Date('2025-09-06 23:55:28.219+07'),
      },
      {
        id: 'a3d60249-1a38-4acb-b8d2-ce3470191b25',
        product_id: '413ca417-8eb1-4848-a003-a634905120aa',
        warranty_package_id: '2e58f184-ec99-4dca-937e-4ec606064368',
        is_default: true,
        created_at: new Date('2025-09-06 23:55:28.219+07'),
        updated_at: new Date('2025-09-06 23:55:28.219+07'),
      },
    ];

    await queryInterface.bulkInsert('product_warranties', data, {});
    console.log('✅ Seeded {} rows into product_warranties', data.length);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('product_warranties', null, {});
  }
};
