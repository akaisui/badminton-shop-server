'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Product variants table
    await queryInterface.createTable('product_variants', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: { type: Sequelize.STRING(255), allowNull: false },
      sku: { type: Sequelize.STRING(255), allowNull: true },
      attributes: { type: Sequelize.JSONB, allowNull: false, defaultValue: '{}' },
      attribute_values: { type: Sequelize.JSONB, allowNull: false, defaultValue: '{}' },
      price: { type: Sequelize.DECIMAL(12, 2), allowNull: false },
      stock_quantity: { type: Sequelize.INTEGER, defaultValue: 0 },
      images: { type: Sequelize.ARRAY(Sequelize.TEXT), allowNull: true },
      display_name: { type: Sequelize.STRING(255), allowNull: true },
      sort_order: { type: Sequelize.INTEGER, defaultValue: 0 },
      is_default: { type: Sequelize.BOOLEAN, defaultValue: false },
      is_available: { type: Sequelize.BOOLEAN, defaultValue: true },
      compare_at_price: { type: Sequelize.DECIMAL(12, 2), allowNull: true },
      specifications: { type: Sequelize.JSONB, defaultValue: '{}' },
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

    // Product specifications table
    await queryInterface.createTable('product_specifications', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: { type: Sequelize.STRING(255), allowNull: false },
      value: { type: Sequelize.TEXT, allowNull: false },
      category: { type: Sequelize.STRING(255), defaultValue: 'General' },
      sort_order: { type: Sequelize.INTEGER, defaultValue: 0 },
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

    // Images table
    await queryInterface.createTable('images', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      original_name: { type: Sequelize.STRING(255), allowNull: false },
      file_name: { type: Sequelize.STRING(255), allowNull: false, unique: true },
      file_path: { type: Sequelize.STRING(500), allowNull: false },
      file_size: { type: Sequelize.INTEGER, allowNull: false },
      mime_type: { type: Sequelize.STRING(100), allowNull: false },
      width: { type: Sequelize.INTEGER, allowNull: true },
      height: { type: Sequelize.INTEGER, allowNull: true },
      category: {
        type: Sequelize.ENUM('product', 'thumbnail', 'user', 'review'),
        defaultValue: 'product',
      },
      product_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
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

    // Add indexes for images
    await queryInterface.addIndex('images', ['product_id'], { name: 'idx_images_product_id' });
    await queryInterface.addIndex('images', ['user_id'], { name: 'idx_images_user_id' });
    await queryInterface.addIndex('images', ['category'], { name: 'idx_images_category' });
    await queryInterface.addIndex('images', ['is_active'], { name: 'idx_images_active' });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('images');
    await queryInterface.dropTable('product_specifications');
    await queryInterface.dropTable('product_variants');
  },
};
