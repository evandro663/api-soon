import { veiculoSchema } from '../utils/joi';

const veiculoService = {

  async validateBodyVeiculo(unknown: any) {
    return veiculoSchema.validateAsync(unknown);
  }
};

export default veiculoService;
