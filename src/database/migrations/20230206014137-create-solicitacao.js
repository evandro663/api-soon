'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('solicitacao', {
      id: { 
        type: Sequelize.INTEGER,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true,
      },
      tipo_servico: {
        type: Sequelize.STRING,
      },
      data_servico: {
        type: Sequelize.DATE,
      },
      hora_servico: {
        type: Sequelize.STRING,
      },
      tempo_total: {
        type: Sequelize.STRING
      },
      valor_total: {
        type: Sequelize.INTEGER,
      },
      distancia_total: {
        type: Sequelize.INTEGER
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('solicitacao');
  }
};