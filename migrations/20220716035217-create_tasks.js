'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      tasks_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    }
 })
},

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks')
  }
};