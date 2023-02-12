export interface ILogin {
  email: string;
  password: string;
}

export interface IJwt {
  data: {
    email: string;
    password: string;
  };
}

export interface ISolicitacao {
  id: number;
  tipo_servico: string;
  created_at: Date;
  coordenadas_origem: string;
  valor_total: number;
  distancia_total: number;
  tempo_total: number;
  empresa: string;
}

export interface IVeiculo {
  placa: string;
  modelo: string;
  marca: string;
  ano: number;
  coordenadas_entrega: string;
  endereco_entrega: string;
  distancia_total: number;
  duracao_total: number;
  ordem_de_entrega: number;
}

export interface IData {
  Solicitacao: ISolicitacao;
  Veiculos: IVeiculo[];
}

export interface TiposServicos {
  [key: string]: {
    valorFixo: number;
    valorPorKm: number;
  };
}
