'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull:false,
        type:Sequelize.STRING
         
      },
      userId:{
        allowNull:false,
        type:Sequelize.INTEGER
       },
      authorName:{
        allowNull:false,
        type:Sequelize.STRING
      },
      price:{
        allowNull:false,
        type:Sequelize.STRING
      },
      publishYear:{
        allowNull:false,
        type:Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('books');
  }
};
