'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Product attributes table
    await queryInterface.createTable('product_attributes', {
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
      type: {
        type: Sequelize.ENUM('color', 'size', 'material', 'custom'),
        defaultValue: 'custom',
      },
      values: { type: Sequelize.JSONB, allowNull: false, defaultValue: '[]' },
      required: { type: Sequelize.BOOLEAN, defaultValue: false },
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

    // Attribute groups table
    await queryInterface.createTable('attribute_groups', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING(255), allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true },
      type: {
        type: Sequelize.ENUM('color', 'config', 'storage', 'size', 'custom'),
        defaultValue: 'custom',
      },
      is_required: { type: Sequelize.BOOLEAN, defaultValue: false },
      sort_order: { type: Sequelize.INTEGER, defaultValue: 0 },
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

    // Attribute values table
    await queryInterface.createTable('attribute_values', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      attribute_group_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'attribute_groups', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: { type: Sequelize.STRING(255), allowNull: false },
      value: { type: Sequelize.STRING(255), allowNull: false },
      color_code: { type: Sequelize.STRING(7), allowNull: true },
      image_url: { type: Sequelize.TEXT, allowNull: true },
      price_adjustment: { type: Sequelize.DECIMAL(12, 2), defaultValue: 0 },
      sort_order: { type: Sequelize.INTEGER, defaultValue: 0 },
      is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
      affects_name: { type: Sequelize.BOOLEAN, defaultValue: false },
      name_template: { type: Sequelize.STRING(255), allowNull: true },
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

    // Product attribute groups junction table
    await queryInterface.createTable('product_attribute_groups', {
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
      attribute_group_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'attribute_groups', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      is_required: { type: Sequelize.BOOLEAN, defaultValue: false },
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product_attribute_groups');
    await queryInterface.dropTable('attribute_values');
    await queryInterface.dropTable('attribute_groups');
    await queryInterface.dropTable('product_attributes');
  },
};
