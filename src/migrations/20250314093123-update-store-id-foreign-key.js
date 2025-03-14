'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      UPDATE products p
      SET store_id = (
          SELECT s.id FROM stores s WHERE s.user_id = p.store_id
      )
      WHERE EXISTS (
          SELECT 1 FROM stores s WHERE s.user_id = p.store_id
      );
      
      UPDATE collections c
      SET store_id = (
          SELECT s.id FROM stores s WHERE s.user_id = c.store_id
      )
      WHERE EXISTS (
          SELECT 1 FROM stores s WHERE s.user_id = c.store_id
      );
    `);
  },
  
  async down(queryInterface) {
    await queryInterface.sequelize.query(`
      UPDATE products p
      SET store_id = (
          SELECT u.id FROM users u WHERE u.id = p.store_id
      )
      WHERE EXISTS (
          SELECT 1 FROM users u WHERE u.id = p.store_id
      );

      UPDATE collections c
      SET store_id = (
          SELECT u.id FROM users u WHERE u.id = c.store_id
      )
      WHERE EXISTS (
          SELECT 1 FROM users u WHERE u.id = c.store_id
      );
    `);
  }
};
