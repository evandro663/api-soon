import { Model, INTEGER, STRING, DATE } from 'sequelize';
import db from '.';

class Solicitacao extends Model {
  id!: number;
  tipoServico!: string;
  dataServico!: string;
  horaServico!: string;
  valorTotal!: number;
  distanciaTotal!: number;
  tempoTotal!: number;
  // empresaId!: number;
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
  dataServico: {
    type: DATE,
    allowNull: false,
  },  
  horaServico: {
    type: STRING,
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
  }
}, {
    sequelize: db,
    modelName: 'solicitacao',
    underscored: true,
    timestamps: false,
  });

export default Solicitacao;