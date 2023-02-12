import { Model, INTEGER, STRING, DATE, DECIMAL } from 'sequelize';
import db from '.';

class Solicitacao extends Model {
  id!: number;
  tipo_servico!: string;
  created_at!: Date;
  coordenadas_origem!: string;
  valor_total!: number;
  distancia_total!: number;
  tempo_total!: number;
  empresa!: string;

  static associate(models: any) {
    this.hasMany(models.Veiculo, { foreignKey: 'id_solicitacao' });
  }
}

Solicitacao.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  tipo_servico: {
    type: STRING,
    allowNull: false,
  },
  created_at: {
    type: DATE,
    allowNull: false,
  },
  coordenadas_origem: {
    type: STRING,
    allowNull: false,
  },
  valor_total: {
    type: DECIMAL,
    allowNull: false,
  },
  distancia_total: {
    type: INTEGER,
    allowNull: false,
  },
  tempo_total: {
    type: INTEGER,
    allowNull: false,
  },
  empresa: {
    type: STRING,
    allowNull: false,
  }
}, {
  sequelize: db,
  modelName: 'solicitacoes',
  underscored: true,
  timestamps: false,
});

export default Solicitacao;