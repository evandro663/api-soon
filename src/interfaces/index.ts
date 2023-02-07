export interface ILogin {
  email: string,
  password:string
}

export interface IJwt {
  data: {
    email: string,
    password: string,
  }
}

export interface ISolicitacao {

  tipoServico: string,
  valorTotal: number,
  distanciaTotal: number,
  tempoTotal: number,
  empresa: string
}