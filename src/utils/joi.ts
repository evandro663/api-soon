import Joi from 'joi';

const solicitacaoSchema = Joi.object({
  tipo_servico: Joi.string().valid("Cegonha", "Guincho").required().messages({
    'string.empty': "O preenchimento da chave 'tipo_servico' é obrigatório.",
    'any.only': "A chave 'tipo_servico' só pode ter valores 'Cegonha' ou 'Guincho'.",
    'any.required': "A chave 'tipo_servico' é obrigatória para a chave 'Solicitacao'.",
  }),
  coordenadas_origem: Joi.string().required().messages({
    'string.empty': "O preenchimento da chave 'coordenadas_origem' é obrigatório.",
    'any.required': "A chave 'coordenadas_origem' é obrigatória para a chave 'Solicitacao'.",
  }),
  empresa: Joi.string().required().messages({
    'string.empty': "O preenchimento da chave 'empresa' é obrigatório.",
    'any.required': "A chave 'empresa' é obrigatória para a chave 'Solicitacao'.",
  })
}).unknown(false).messages({ 'object.unknown': "A chave 'Solicitacao' possui uma chave desconhecida dentro da mesma. Verifique a documentação para obter as chaves válidas para 'Solicitacao'." });

const veiculoSchema = Joi.array().items(Joi.object({
  placa: Joi.string().required().messages({
    'string.empty': "O preenchimento da chave 'placa' é obrigatório.",
    'any.required': "A chave 'placa' é obrigatória para a chave 'Veiculos'."
  }),
  modelo: Joi.string().required().messages({
    'string.empty': "O preenchimento da chave 'modelo' é obrigatório.",
    'any.required': "A chave 'modelo' é obrigatória para a chave 'Veiculos'."
  }),
  marca: Joi.string().required().messages({
    'string.empty': "O preenchimento da chave 'marca' é obrigatório.",
    'any.required': "A chave 'marca' é obrigatória para a chave 'Veiculos'."
  }),
  ano: Joi.number().integer().required().messages({
    'number.empty': "O preenchimento da chave 'ano' é obrigatório.",
    'number.integer': "A chave 'ano' deve ser um número inteiro.",
    'any.required': "A chave 'ano' é obrigatória para a chave 'Veiculos'.",
    'number.base': "A chave 'ano' deve ser um número válido."
  }),
  coordenadas_entrega: Joi.string().required().messages({
    'string.empty': "O preenchimento da chave 'coordenadas_entrega' é obrigatório.",
    'any.required': "A chave 'coordenadas_entrega' é obrigatória para a chave 'Veiculos'."
  })
})).unique("placa").messages({
  'array.unique': 'Existem placas com valores repetidos. O valor deve ser único.'
}).strip (false).messages({ 'object.unknown': "A chave 'Veiculos' possui uma chave desconhecida dentro da mesma. Verifique a documentação para obter as chaves válidas para 'Veiculos'." });

const defaultSchema = Joi.object({
  Solicitacao: Joi.required().messages({ 'any.required': "A chave 'Solicitacao' é obrigatória para esta requisição." }),
  Veiculos: Joi.required().messages({ 'any.required': "A chave 'Veiculos' é obrigatória para esta requisição." }),
}).unknown(false).messages({ 'object.unknown': "Apenas a chave 'Solicitacao' e a chave 'Veiculos' são válidas para solicitações. Verifique a documentação." });

const listSchema = Joi.object({
  empresa: Joi.string().required().messages({
    'string.empty': "O preenchimento da chave 'empresa' é obrigatório.",
    'any.required': "A chave 'empresa' é obrigatória para listar os detalhes.'"
  }),
  start_date: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/).required().messages({
    'string.empty': "O preenchimento da chave 'startDate' é obrigatório.",
    'string.pattern.base': "A chave 'startDate' deve estar no formato 'yyyy-mm-dd.'",
    'any.required': "A chave 'start_date' é obrigatória para listar os detalhes.'"
  }),
  end_date: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/).required().messages({
    'string.empty': "O preenchimento da chave 'endDate' é obrigatório.",
    'string.pattern.base': "A chave 'endDate' deve estar no formato 'yyyy-mm-dd.'",
    'any.required': "A chave 'end_date' é obrigatória para listar os detalhes.'"
  }),
}).unknown(false).messages({ 'object.unknown': "O objeto informado para listagem possui uma chave desconhecida dentro da mesma. Verifique a documentação para obter as chaves válidas para listagem." });

const loginSchema = Joi.object({
  email: Joi.string().required().email().messages({
    'string.empty': "O preenchimento da chave 'email' é obrigatório.",
    'any.required': "A chave 'email' é obrigatória para login.'",
    'string.email': "O formato do email informado é inválido.'"
  }),
  password: Joi.string().required().messages({
    'string.empty': "O preenchimento da chave 'password' é obrigatório.",
    'any.required': "A chave 'password' é obrigatória para login.'"
  })
}).unknown(false).messages({ 'object.unknown': "O objeto informado para login possui uma chave desconhecida dentro da mesma. Verifique a documentação para obter as chaves válidas para login." });


  export default defaultSchema;
  export { solicitacaoSchema };
  export { veiculoSchema };
  export { listSchema };
  export { loginSchema };
