'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Vouchers table
    await queryInterface.createTable('vouchers', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      code: { type: Sequelize.STRING(20), allowNull: false, unique: true },
      name: { type: Sequelize.STRING(255), allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true },
      type: {
        type: Sequelize.ENUM('percentage', 'fixed_amount', 'free_shipping'),
        defaultValue: 'fixed_amount',
      },
      value: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      min_order_value: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0 },
      max_discount: { type: Sequelize.DECIMAL(10, 2), allowNull: true },
      start_date: { type: Sequelize.DATE, allowNull: false },
      end_date: { type: Sequelize.DATE, allowNull: false },
      is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
      usage_limit: { type: Sequelize.INTEGER, allowNull: true },
      used_count: { type: Sequelize.INTEGER, defaultValue: 0 },
      user_limit: {
        type: Sequelize.ENUM('all', 'first_time', 'existing'),
        defaultValue: 'all',
      },
      applicable_categories: { type: Sequelize.TEXT, allowNull: true },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // News table
    await queryInterface.createTable('news', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      title: { type: Sequelize.STRING(255), allowNull: false },
      slug: { type: Sequelize.STRING(255), allowNull: false, unique: true },
      excerpt: { type: Sequelize.TEXT, allowNull: false },
      content: { type: Sequelize.TEXT, allowNull: false },
      featured_image: { type: Sequelize.STRING(255), allowNull: true },
      author: { type: Sequelize.STRING(255), defaultValue: 'Admin' },
      status: {
        type: Sequelize.ENUM('draft', 'published', 'archived'),
        defaultValue: 'published',
      },
      published_at: { type: Sequelize.DATE, allowNull: true },
      tags: { type: Sequelize.ARRAY(Sequelize.TEXT), allowNull: true },
      view_count: { type: Sequelize.INTEGER, defaultValue: 0 },
      seo_title: { type: Sequelize.STRING(255), allowNull: true },
      seo_description: { type: Sequelize.TEXT, allowNull: true },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Contacts table
    await queryInterface.createTable('contacts', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING(100), allowNull: false },
      email: { type: Sequelize.STRING(255), allowNull: false },
      subject: {
        type: Sequelize.ENUM('general', 'support', 'feedback', 'partnership'),
        allowNull: false,
      },
      message: { type: Sequelize.TEXT, allowNull: false },
      status: {
        type: Sequelize.ENUM('pending', 'in_progress', 'resolved', 'closed'),
        defaultValue: 'pending',
      },
      admin_notes: { type: Sequelize.TEXT, allowNull: true },
      responded_at: { type: Sequelize.DATE, allowNull: true },
      is_read: { type: Sequelize.BOOLEAN, defaultValue: false },
      priority: {
        type: Sequelize.ENUM('low', 'medium', 'high', 'urgent'),
        defaultValue: 'medium',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Add indexes
    await queryInterface.addIndex('vouchers', ['code'], { name: 'idx_vouchers_code' });
    await queryInterface.addIndex('vouchers', ['is_active'], { name: 'idx_vouchers_active' });
    await queryInterface.addIndex('vouchers', ['start_date', 'end_date'], { name: 'idx_vouchers_dates' });
    await queryInterface.addIndex('contacts', ['email'], { name: 'idx_contacts_email' });
    await queryInterface.addIndex('contacts', ['status'], { name: 'idx_contacts_status' });
    await queryInterface.addIndex('contacts', ['subject'], { name: 'idx_contacts_subject' });
    await queryInterface.addIndex('contacts', ['created_at'], { name: 'idx_contacts_created_at' });
    await queryInterface.addIndex('contacts', ['is_read'], { name: 'idx_contacts_read' });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('contacts');
    await queryInterface.dropTable('news');
    await queryInterface.dropTable('vouchers');
  },
};
