'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('veiculos', {
      id: { 
        type: Sequelize.INTEGER,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true,
      },
      id_solicitacao: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        references: {
          model: 'solicitacoes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      placa: {
        allowNull: false,
        type: Sequelize.STRING,
        allowNull: false, 
      },
      modelo: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      marca: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      ano: {
        type: Sequelize.INTEGER,
        allowNull: false, 
      },
      coordenadas_entrega: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      endereco_entrega: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      distancia_total: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false, 
      },
      duracao_total: {
        type: Sequelize.INTEGER,
        allowNull: false, 
      },
      ordem_de_entrega: {
        type: Sequelize.INTEGER,
        allowNull: false, 
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('veiculos');
  }
};
