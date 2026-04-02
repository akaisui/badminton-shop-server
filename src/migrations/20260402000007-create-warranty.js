'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Warranty packages table
    await queryInterface.createTable('warranty_packages', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING(255), allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true },
      duration_months: { type: Sequelize.INTEGER, allowNull: false },
      price: { type: Sequelize.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
      terms: { type: Sequelize.JSONB, defaultValue: '{}' },
      coverage: { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: true },
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

    // Product warranties junction table
    await queryInterface.createTable('product_warranties', {
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
      warranty_package_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'warranty_packages', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      is_default: { type: Sequelize.BOOLEAN, defaultValue: false },
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

    // Add unique constraint for product_warranties
    await queryInterface.addIndex('product_warranties', ['product_id', 'warranty_package_id'], {
      unique: true,
      name: 'product_warranties_unique',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product_warranties');
    await queryInterface.dropTable('warranty_packages');
  },
};
