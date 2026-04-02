'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Orders table
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      number: { type: Sequelize.STRING(255), allowNull: false, unique: true },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: {
        type: Sequelize.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
        defaultValue: 'pending',
      },
      // Shipping address
      shipping_first_name: { type: Sequelize.STRING(255), allowNull: false },
      shipping_last_name: { type: Sequelize.STRING(255), allowNull: false },
      shipping_company: { type: Sequelize.STRING(255), allowNull: true },
      shipping_address1: { type: Sequelize.STRING(255), allowNull: false },
      shipping_address2: { type: Sequelize.STRING(255), allowNull: true },
      shipping_city: { type: Sequelize.STRING(255), allowNull: false },
      shipping_state: { type: Sequelize.STRING(255), allowNull: false },
      shipping_zip: { type: Sequelize.STRING(255), allowNull: false },
      shipping_country: { type: Sequelize.STRING(255), allowNull: false },
      shipping_phone: { type: Sequelize.STRING(255), allowNull: true },
      // Billing address
      billing_first_name: { type: Sequelize.STRING(255), allowNull: false },
      billing_last_name: { type: Sequelize.STRING(255), allowNull: false },
      billing_company: { type: Sequelize.STRING(255), allowNull: true },
      billing_address1: { type: Sequelize.STRING(255), allowNull: false },
      billing_address2: { type: Sequelize.STRING(255), allowNull: true },
      billing_city: { type: Sequelize.STRING(255), allowNull: false },
      billing_state: { type: Sequelize.STRING(255), allowNull: false },
      billing_zip: { type: Sequelize.STRING(255), allowNull: false },
      billing_country: { type: Sequelize.STRING(255), allowNull: false },
      billing_phone: { type: Sequelize.STRING(255), allowNull: true },
      // Payment information
      payment_method: { type: Sequelize.STRING(255), allowNull: false },
      payment_status: {
        type: Sequelize.ENUM('pending', 'paid', 'failed', 'refunded'),
        defaultValue: 'pending',
      },
      payment_transaction_id: { type: Sequelize.STRING(255), allowNull: true },
      payment_provider: { type: Sequelize.STRING(255), allowNull: true },
      // Pricing
      subtotal: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      tax: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      shipping_cost: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      discount: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0 },
      voucher_code: { type: Sequelize.STRING(255), allowNull: true },
      voucher_discount: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0 },
      total: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      // Additional information
      notes: { type: Sequelize.TEXT, allowNull: true },
      tracking_number: { type: Sequelize.STRING(255), allowNull: true },
      shipping_provider: { type: Sequelize.STRING(255), allowNull: true },
      estimated_delivery: { type: Sequelize.DATE, allowNull: true },
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

    // Order items table
    await queryInterface.createTable('order_items', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      order_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'orders', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      variant_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'product_variants', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      name: { type: Sequelize.STRING(255), allowNull: false },
      sku: { type: Sequelize.STRING(255), allowNull: true },
      price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
      subtotal: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      image: { type: Sequelize.STRING(255), allowNull: true },
      attributes: { type: Sequelize.JSONB, defaultValue: '{}' },
      warranty_package_ids: { type: Sequelize.ARRAY(Sequelize.UUID), allowNull: true },
      warranty_total: { type: Sequelize.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
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

    // Tracking steps table
    await queryInterface.createTable('tracking_steps', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      order_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'orders', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      step_number: { type: Sequelize.INTEGER, allowNull: false },
      step_name: {
        type: Sequelize.ENUM('preparing', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered'),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending', 'completed', 'delayed', 'failed', 'on_hold'),
        defaultValue: 'pending',
      },
      completed_at: { type: Sequelize.DATE, allowNull: true },
      estimated_time: { type: Sequelize.DATE, allowNull: true },
      admin_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'users', key: 'id' },
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

    // Tracking details table
    await queryInterface.createTable('tracking_details', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      tracking_step_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'tracking_steps', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      location: { type: Sequelize.STRING(255), allowNull: true },
      description: { type: Sequelize.TEXT, allowNull: true },
      shipper_name: { type: Sequelize.STRING(255), allowNull: true },
      shipper_phone: { type: Sequelize.STRING(255), allowNull: true },
      proof_images: { type: Sequelize.JSON, allowNull: true },
      has_issue: { type: Sequelize.BOOLEAN, defaultValue: false },
      issue_reason: { type: Sequelize.TEXT, allowNull: true },
      issue_type: {
        type: Sequelize.ENUM('address_incorrect', 'customer_unavailable', 'weather_delay', 'vehicle_breakdown', 'other'),
        allowNull: true,
      },
      estimated_resolution: { type: Sequelize.DATE, allowNull: true },
      admin_notes: { type: Sequelize.TEXT, allowNull: true },
      updated_by_admin: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'users', key: 'id' },
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

    // Add unique constraint for tracking_steps
    await queryInterface.addIndex('tracking_steps', ['order_id', 'step_number'], {
      unique: true,
      name: 'tracking_steps_order_step_unique',
    });

    // Add indexes for orders
    await queryInterface.addIndex('orders', ['user_id'], { name: 'idx_orders_user_id' });
    await queryInterface.addIndex('orders', ['status'], { name: 'idx_orders_status' });
    await queryInterface.addIndex('orders', ['number'], { name: 'idx_orders_number' });
    await queryInterface.addIndex('orders', ['created_at'], { name: 'idx_orders_created_at' });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tracking_details');
    await queryInterface.dropTable('tracking_steps');
    await queryInterface.dropTable('order_items');
    await queryInterface.dropTable('orders');
  },
};
