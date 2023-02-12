import { Op } from 'sequelize';
import { ISolicitacao } from './../interfaces/index';
import { DataBaseError, ValidationError, NotFoundError } from '../utils/erros';
import { IData } from '../interfaces';
import sequelize from '../database/models';
import solicitacaoModel from '../database/models/solicitacao';
import veiculoModel from '../database/models/veiculo';
import { calculateTotalValue, calculateTotalDistance, getBestRoute } from '../utils/utils';
import defaultSchema, { solicitacaoSchema, listSchema } from '../utils/joi';

const SolicitacaoService = {

  async validateDefaultBody(unknown: IData) {
    return await defaultSchema.validateAsync(unknown);
  },

  async validateBodySolicitacao(unknown: ISolicitacao) {
    return await solicitacaoSchema.validateAsync(unknown);
  },

  async validateBodyLista(unknown: any) {
    return await listSchema.validateAsync(unknown);
  },

  async add(data: IData) {
    try {
      if (data.Veiculos.length == 0) {
        throw new ValidationError("Deve ser informado pelo menos um veículo para a Solicitação.");
      }
      if (data.Solicitacao.tipo_servico === 'Guincho' && data.Veiculos.length > 2) {
        throw new ValidationError("Tipo de serviço 'Guincho' pode ter no máximo 2 veículos.");
      }
      if (data.Solicitacao.tipo_servico === 'Cegonha' && data.Veiculos.length > 11) {
        throw new ValidationError("Tipo de serviço 'Cegonha' pode ter no máximo 11 veículos.");
      }

      const bestRoute = await getBestRoute(data.Veiculos, data.Solicitacao.coordenadas_origem);
      const totalDistance = calculateTotalDistance(bestRoute);
      const totalValue = calculateTotalValue(data.Solicitacao.tipo_servico, totalDistance.totalDistance);

      const result = await sequelize.transaction(async (transaction: any) => {
        const solicitacao = await solicitacaoModel.create({
          tipo_servico: data.Solicitacao.tipo_servico,
          created_at: new Date(),
          coordenadas_origem: data.Solicitacao.coordenadas_origem,
          valor_total: totalValue,
          distancia_total: totalDistance.totalDistance,
          tempo_total: totalDistance.totalDuration,
          empresa: data.Solicitacao.empresa,
        }, { transaction });

        const veiculosData = data.Veiculos.map((veiculo) => {
          const informacoes = bestRoute.find(bestRoute => bestRoute.placa === veiculo.placa);
          return {
            id_solicitacao: solicitacao.id,
            ...veiculo,
            ...informacoes,
          };
        });

        const veiculos = await veiculoModel.bulkCreate(veiculosData, { transaction });

        return [solicitacao, veiculos];
      });

      return result;
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      } else { throw new DataBaseError(`Failed to create Solicitação. ${error}`)};
    }
  },


  async listById(id: number) {
    try {
      const solicitacao = await solicitacaoModel.findOne({
        where: { id },
        include: [{
          model: veiculoModel,
          as: 'veiculos',
          required: true,
          order: [['ordem_de_entrega', 'ASC']],
        }],
      });
  
      if (!solicitacao) {
        throw new NotFoundError(`Id '${id}' informado não corresponde a nenhuma solicitação válida.`);
      }
  
      return solicitacao;
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw error;
      } else { throw new DataBaseError(`Ocorreu um erro ao buscar a solicitação com o ID '${id}'. ${error.message}`) };
    }
  },

  async listByCompany(empresa: string, startDate: Date, endDate: Date) {
    const company = await solicitacaoModel.findOne({ where: { empresa } });

    if (!company) {
      throw new NotFoundError(`A empresa '${empresa}' não foi encontrada na base de dados.`);
    }

    const result = await solicitacaoModel.findAll({
      attributes: [
        'empresa',
        [sequelize.fn('count', sequelize.col('id')), 'total_solicitacoes'],
        [sequelize.fn('to_char', sequelize.fn('sum', sequelize.col('valor_total')), 'FM999999990.00'), 'soma_valor'],
      ],
      where: {
        empresa: empresa,
        created_at: {
          [Op.between]: [startDate, endDate]
        }
      },
      group: ['empresa'],
    });

    if (result.length === 0) {
      throw new NotFoundError(`Não foram encontrados dados para a empresa '${empresa}' no período entre ${startDate} e ${endDate}.`);
    }
    
    return result;
    
  }

}

export default SolicitacaoService;
