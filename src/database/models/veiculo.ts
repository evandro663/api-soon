import { Model, INTEGER, STRING, DECIMAL } from 'sequelize';
import db from '.';

import Solicitacao from './solicitacao';

class Veiculo extends Model {
  id!: number;
  id_solicitacao!: number;
  placa!: string;
  modelo!: string;
  marca!: string;
  ano!: number;
  coordenadas_entrega!: string;
  endereco_entrega!: string;
  distancia_total!: number;
  duracao_total!: number;
  ordem_de_entrega!: number;
}

Veiculo.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  id_solicitacao: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'solicitacoes',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  placa: {
    type: STRING,
    allowNull: false,
  },
  modelo: {
    type: STRING,
    allowNull: false,
  },
  marca: {
    type: STRING,
    allowNull: false,
  },
  ano: {
    type: INTEGER,
    allowNull: false,
  },
  coordenadas_entrega: {
    type: STRING,
    allowNull: false,
  },
  endereco_entrega: {
    type: STRING,
    allowNull: false,
  },
  distancia_total: {
    type: DECIMAL,
    allowNull: false,
  },
  duracao_total: {
    type: DECIMAL,
    allowNull: false,
  },
  ordem_de_entrega: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'veiculos',
  underscored: true,
  timestamps: false,
});

Veiculo.belongsTo(Solicitacao, { foreignKey: 'id_solicitacao' });

Solicitacao.hasMany(Veiculo, { foreignKey: 'id_solicitacao' });

export default Veiculo;
