import { Model, INTEGER, STRING, DATE } from 'sequelize';
import db from '.';

class Solicitacao extends Model {
  id!: number;
  tipoServico!: string;
  createdAt!: Date;
  valorTotal!: number;
  distanciaTotal!: number;
  tempoTotal!: number;
  empresa!: string;
}

Solicitacao.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  tipoServico: {
    type: STRING,
    allowNull: false,
  },
  createdAt: {
    type: DATE,
    allowNull: false,
  },  
  valorTotal: {
    type: INTEGER,
    allowNull: false,
  }, 
  distanciaTotal: {
    type: INTEGER,
    allowNull: false,
  }, 
  tempoTotal: {
    type: INTEGER,
    allowNull: false,
  },
  empresa: {
    type: STRING,
    allowNull: false,
  }
}, {
    sequelize: db,
    modelName: 'solicitacaos',
    underscored: true,
    timestamps: false,
  });

export default Solicitacao;