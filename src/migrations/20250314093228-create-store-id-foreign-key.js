'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint('products', {
      fields: ['store_id'],
      type: 'foreign key',
      references: { table: 'stores', field: 'id' },
      onDelete: 'CASCADE'
    });

    await queryInterface.addConstraint('collections', {
      fields: ['store_id'],
      type: 'foreign key',
      references: { table: 'stores', field: 'id' },
      onDelete: 'CASCADE'
    });
  },
  
  async down(queryInterface) {
    await queryInterface.removeConstraint('products', 'products_store_id_fkey');
    await queryInterface.removeConstraint('collections', 'collections_store_id_fkey');
  }
};
