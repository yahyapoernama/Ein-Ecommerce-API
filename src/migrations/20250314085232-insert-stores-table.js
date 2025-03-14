'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Menambahkan store baru dengan UUID unik
    await queryInterface.sequelize.query(`
      INSERT INTO stores (id, user_id, name, slug, created_at, updated_at)
      SELECT gen_random_uuid(), u.id, u.username, LOWER(REPLACE(u.username, ' ', '-')), NOW(), NOW()
      FROM users u
      WHERE u.id IN (
          SELECT DISTINCT store_id FROM products
          UNION
          SELECT DISTINCT store_id FROM collections
      );
    `);
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query(`
      DELETE FROM stores WHERE user_id IN (
          SELECT DISTINCT store_id FROM products
          UNION
          SELECT DISTINCT store_id FROM collections
      );
    `);
  }
};
