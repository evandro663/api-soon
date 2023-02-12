'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('solicitacoes', {
      id: { 
        type: Sequelize.INTEGER,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true,
      },
      tipo_servico: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      coordenadas_origem: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      valor_total: {
        type: Sequelize.DECIMAL(15, 2),
      },
      distancia_total: {
        type: Sequelize.DECIMAL(15, 2),
      },
      tempo_total: {
        type: Sequelize.INTEGER
      },
      empresa: {
        type: Sequelize.STRING
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('solicitacoes');
  }
};