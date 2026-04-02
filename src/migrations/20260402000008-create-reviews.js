'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Reviews table
    await queryInterface.createTable('reviews', {
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
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      rating: { type: Sequelize.INTEGER, allowNull: false },
      title: { type: Sequelize.STRING(255), allowNull: true },
      content: { type: Sequelize.TEXT, allowNull: false },
      is_verified: { type: Sequelize.BOOLEAN, defaultValue: false },
      likes: { type: Sequelize.INTEGER, defaultValue: 0 },
      dislikes: { type: Sequelize.INTEGER, defaultValue: 0 },
      images: { type: Sequelize.ARRAY(Sequelize.TEXT), allowNull: true },
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

    // Review feedbacks table
    await queryInterface.createTable('review_feedbacks', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      review_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'reviews', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      is_helpful: { type: Sequelize.BOOLEAN, allowNull: false },
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

    // Add unique constraint for review_feedbacks
    await queryInterface.addIndex('review_feedbacks', ['review_id', 'user_id'], {
      unique: true,
      name: 'review_feedbacks_unique',
    });

    // Add indexes for reviews
    await queryInterface.addIndex('reviews', ['product_id'], { name: 'idx_reviews_product_id' });
    await queryInterface.addIndex('reviews', ['user_id'], { name: 'idx_reviews_user_id' });
    await queryInterface.addIndex('reviews', ['rating'], { name: 'idx_reviews_rating' });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('review_feedbacks');
    await queryInterface.dropTable('reviews');
  },
};
