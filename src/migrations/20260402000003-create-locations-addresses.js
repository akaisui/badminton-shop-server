'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Vietnamese locations table
    await queryInterface.createTable('vietnamese_locations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('province', 'ward'),
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      parent_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'vietnamese_locations',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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

    // Addresses table
    await queryInterface.createTable('addresses', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: { type: Sequelize.STRING(255), allowNull: true },
      first_name: { type: Sequelize.STRING(255), allowNull: true },
      last_name: { type: Sequelize.STRING(255), allowNull: true },
      company: { type: Sequelize.STRING(255), allowNull: true },
      address1: { type: Sequelize.STRING(255), allowNull: true },
      address2: { type: Sequelize.STRING(255), allowNull: true },
      city: { type: Sequelize.STRING(255), allowNull: true },
      state: { type: Sequelize.STRING(255), allowNull: true },
      zip: { type: Sequelize.STRING(255), allowNull: false },
      country: { type: Sequelize.STRING(255), allowNull: false },
      phone: { type: Sequelize.STRING(255), allowNull: true },
      is_default: { type: Sequelize.BOOLEAN, defaultValue: false },
      receiver_name: { type: Sequelize.STRING(255), allowNull: false },
      address_label: {
        type: Sequelize.ENUM('home', 'office', 'other'),
        defaultValue: 'home',
      },
      notes: { type: Sequelize.TEXT, allowNull: true },
      ward: { type: Sequelize.STRING(255), allowNull: false },
      district: { type: Sequelize.STRING(255), allowNull: true },
      province: { type: Sequelize.STRING(255), allowNull: false },
      detail_address: { type: Sequelize.STRING(500), allowNull: false },
      province_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'vietnamese_locations', key: 'id' },
      },
      district_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'vietnamese_locations', key: 'id' },
      },
      ward_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'vietnamese_locations', key: 'id' },
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

    // Add indexes for locations
    await queryInterface.addIndex('vietnamese_locations', ['type']);
    await queryInterface.addIndex('vietnamese_locations', ['parent_id']);
    await queryInterface.addIndex('vietnamese_locations', ['code']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('addresses');
    await queryInterface.dropTable('vietnamese_locations');
  },
};
