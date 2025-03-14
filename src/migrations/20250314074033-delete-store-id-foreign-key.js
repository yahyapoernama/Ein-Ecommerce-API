'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('products', 'products_store_id_fkey');
    await queryInterface.removeConstraint('collections', 'collections_store_id_fkey');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addConstraint('products', {
      fields: ['store_id'],
      type: 'foreign key',
      references: { table: 'users', field: 'id' },
      onDelete: 'CASCADE'
    });
    await queryInterface.addConstraint('collections', {
      fields: ['store_id'],
      type: 'foreign key',
      references: { table: 'users', field: 'id' },
      onDelete: 'CASCADE'
    });
  }
};

