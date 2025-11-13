'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('books', 'type_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'types',
        key: 'id',
        onDelete: 'CASCADE',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('books', 'type_id');
  }
};
