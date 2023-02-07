'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('solicitacaos', {
      id: { 
        type: Sequelize.INTEGER,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true,
      },
      tipo_servico: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      valor_total: {
        type: Sequelize.INTEGER,
      },
      distancia_total: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('solicitacaos');
  }
};