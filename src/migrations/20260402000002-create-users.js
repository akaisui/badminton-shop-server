'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      first_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'other'),
        allowNull: true,
      },
      date_of_birth: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      avatar: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      role: {
        type: Sequelize.ENUM('customer', 'admin', 'manager'),
        defaultValue: 'customer',
      },
      role_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'roles',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      is_email_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      verification_token: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      reset_password_token: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      reset_password_expires: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      stripe_customer_id: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      facebook_id: {
        type: Sequelize.STRING(255),
        allowNull: true,
        unique: true,
      },
      google_id: {
        type: Sequelize.STRING(255),
        allowNull: true,
        unique: true,
      },
      provider: {
        type: Sequelize.ENUM('local', 'facebook', 'google'),
        defaultValue: 'local',
      },
      social_providers: {
        type: Sequelize.JSONB,
        allowNull: true,
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

    // Add indexes for users
    await queryInterface.addIndex('users', ['email'], { name: 'idx_users_email' });
    await queryInterface.addIndex('users', ['role'], { name: 'idx_users_role' });
    await queryInterface.addIndex('users', ['provider'], { name: 'idx_users_provider' });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};
