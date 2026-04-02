'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Categories table
    await queryInterface.createTable('categories', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING(255), allowNull: false },
      slug: { type: Sequelize.STRING(255), allowNull: false, unique: true },
      description: { type: Sequelize.TEXT, allowNull: true },
      image: { type: Sequelize.STRING(255), allowNull: true },
      parent_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      level: { type: Sequelize.INTEGER, defaultValue: 1 },
      is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
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

    // Products table
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: { type: Sequelize.TEXT, allowNull: false },
      slug: { type: Sequelize.TEXT, allowNull: false, unique: true },
      description: { type: Sequelize.TEXT, allowNull: false },
      short_description: { type: Sequelize.TEXT, allowNull: false },
      price: { type: Sequelize.DECIMAL(12, 2), allowNull: false },
      compare_at_price: { type: Sequelize.DECIMAL(12, 2), allowNull: true },
      images: { type: Sequelize.TEXT, defaultValue: '[]' },
      thumbnail: { type: Sequelize.TEXT, allowNull: true },
      in_stock: { type: Sequelize.BOOLEAN, defaultValue: true },
      stock_quantity: { type: Sequelize.INTEGER, defaultValue: 0 },
      sku: { type: Sequelize.TEXT, unique: true, allowNull: true },
      status: {
        type: Sequelize.ENUM('active', 'inactive', 'draft'),
        defaultValue: 'active',
      },
      featured: { type: Sequelize.BOOLEAN, defaultValue: false },
      search_keywords: { type: Sequelize.TEXT, defaultValue: '[]' },
      seo_title: { type: Sequelize.TEXT, allowNull: true },
      seo_description: { type: Sequelize.TEXT, allowNull: true },
      seo_keywords: { type: Sequelize.TEXT, defaultValue: '[]' },
      specifications: { type: Sequelize.TEXT, defaultValue: '[]' },
      condition: {
        type: Sequelize.ENUM('new', 'like-new', 'used', 'refurbished'),
        defaultValue: 'new',
      },
      base_name: { type: Sequelize.TEXT, allowNull: true },
      is_variant_product: { type: Sequelize.BOOLEAN, defaultValue: false },
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

    // Product categories junction table
    await queryInterface.createTable('product_categories', {
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
      category_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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

    // Add unique constraint for product_categories
    await queryInterface.addIndex('product_categories', ['product_id', 'category_id'], {
      unique: true,
      name: 'product_categories_unique',
    });

    // Add indexes for products and categories
    await queryInterface.addIndex('categories', ['slug'], { name: 'idx_categories_slug' });
    await queryInterface.addIndex('categories', ['parent_id'], { name: 'idx_categories_parent_id' });
    await queryInterface.addIndex('products', ['slug'], { name: 'idx_products_slug' });
    await queryInterface.addIndex('products', ['status'], { name: 'idx_products_status' });
    await queryInterface.addIndex('products', ['featured'], { name: 'idx_products_featured' });
    await queryInterface.addIndex('products', ['price'], { name: 'idx_products_price' });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product_categories');
    await queryInterface.dropTable('products');
    await queryInterface.dropTable('categories');
  },
};
