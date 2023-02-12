import solicitacaoModel from '../database/models/solicitacao';

export function createFakeSolicitacao() {
  return solicitacaoModel.build({
    id: 1,
    tipo_servico: 'Cegonha',
    created_at: new Date('2023-02-11T21:17:44.364Z'),
    coordenadas_origem: '-25.084749273014125, -50.16177823356103',
    valor_total: '370.00',
    distancia_total: 1870,
    tempo_total: 567,
    empresa: 'DAF',
    veiculos: [
      {
        id: 1,
        id_solicitacao: 1,
        placa: 'xyz-11223',
        modelo: 'Palio',
        marca: 'Fiat',
        ano: 1991,
        coordenadas_entrega: '-25.087178328256872, -50.16244557846063',
        endereco_entrega: 'R. Cel. Dulcídio, 1571 - Centro, Ponta Grossa - PR, 84010-280, Brazil',
        distancia_total: 375,
        duracao_total: 117,
        ordem_de_entrega: 1,
      },
      {
        id: 2,
        id_solicitacao: 1,
        placa: 'xyz-1233313',
        modelo: 'Corsa',
        marca: 'Fiat',
        ano: 2012,
        coordenadas_entrega: '-25.08606324744958, -50.15990657556239',
        endereco_entrega: 'R. Dr. Penteado de Almeida, 22 - Centro, Ponta Grossa - PR, 84010-240, Brazil',
        distancia_total: 721,
        duracao_total: 226,
        ordem_de_entrega: 2,
      },
      {
        id: 3,
        id_solicitacao: 1,
        placa: 'xyz-124433',
        modelo: 'Fusca',
        marca: 'Fiat',
        ano: 2012,
        coordenadas_entrega: '-25.08913691721197, -50.15869448874851',
        endereco_entrega: 'R. Dr. Francisco Burzio, 465 - Centro, Ponta Grossa - PR, 84010-200, Brazil',
        distancia_total: 774,
        duracao_total: 224,
        ordem_de_entrega: 3,
      },
    ],
  });
}

export function createSolicitacaoBody() {
  return ({
    "Solicitacao": {
      "tipo_servico": "Cegonha",
      "coordenadas_origem": "-25.084749273014125, -50.16177823356103",
      "empresa": "DAF"
    },
    "Veiculos": [
      {
        "placa": "xyz-11223",
        "modelo": "Palio",
        "marca": "Fiat",
        "ano": "1991",
        "coordenadas_entrega": "-25.087178328256872, -50.16244557846063"
      },
      {
        "placa": "xyz-1233313",
        "modelo": "Corsa",
        "marca": "Chevrolet",
        "ano": "2012",
        "coordenadas_entrega": "-25.08606324744958, -50.15990657556239"
      },
      {
        "placa": "xyz-124433",
        "modelo": "Fusca",
        "marca": "Fiat",
        "ano": "2012",
        "coordenadas_entrega": "-25.08913691721197, -50.15869448874851"
      }
    ]
  })
}

export function createSolicitacaoBodyFail() {
  return ({
    "": {
      "tipo_servico": "Cegonha",
      "coordenadas_origem": "-25.084749273014125, -50.16177823356103",
      "empresa": "DAF"
    },
    "Veiculos": [
      {
        "placa": "xyz-11223",
        "modelo": "Palio",
        "marca": "Fiat",
        "ano": "1991",
        "coordenadas_entrega": "-25.087178328256872, -50.16244557846063"
      },
      {
        "placa": "xyz-1233313",
        "modelo": "Corsa",
        "marca": "Chevrolet",
        "ano": "2012",
        "coordenadas_entrega": "-25.08606324744958, -50.15990657556239"
      },
      {
        "placa": "xyz-124433",
        "modelo": "Fusca",
        "marca": "Fiat",
        "ano": "2012",
        "coordenadas_entrega": "-25.08913691721197, -50.15869448874851"
      }
    ]
  })
}

export function createSolicitacaoBodyGuinchoFail() {
  return ({
    "Solicitacao": {
      "tipo_servico": "Guincho",
      "coordenadas_origem": "-25.084749273014125, -50.16177823356103",
      "empresa": "DAF"
    },
    "Veiculos": [
      {
        "placa": "xyz-11223",
        "modelo": "Palio",
        "marca": "Fiat",
        "ano": "1991",
        "coordenadas_entrega": "-25.087178328256872, -50.16244557846063"
      },
      {
        "placa": "xyz-1233313",
        "modelo": "Corsa",
        "marca": "Chevrolet",
        "ano": "2012",
        "coordenadas_entrega": "-25.08606324744958, -50.15990657556239"
      },
      {
        "placa": "xyz-124433",
        "modelo": "Fusca",
        "marca": "Fiat",
        "ano": "2012",
        "coordenadas_entrega": "-25.08913691721197, -50.15869448874851"
      }
    ]
  })
}

export function createSolicitacaoBodyCegonhaFail() {
  return ({
    "Solicitacao": {
      "tipo_servico" : "Cegonha",
      "coordenadas_origem": "-25.084749273014125, -50.16177823356103",
      "empresa": "DAF"
    },
      "Veiculos": [
        {
          "placa": "xyz-1122323",
          "modelo": "Palio",
          "marca": "Fiat",
          "ano": "1991",
          "coordenadas_entrega": "-25.087178328256872, -50.16244557846063"
        },
        {
          "placa": "xyz-12334313",
          "modelo": "Corsa",
          "marca": "Chevrolet",
          "ano": "2012",
          "coordenadas_entrega": "-25.08606324744958, -50.15990657556239"
        },
        {
          "placa": "xyz-1244533",
          "modelo": "Fusca",
          "marca": "Fiat",
          "ano": "2012",
          "coordenadas_entrega": "-25.08913691721197, -50.15869448874851"
        },
        {
          "placa": "xyz-12443673",
          "modelo": "Fusca",
          "marca": "Fiat",
          "ano": "2012",
          "coordenadas_entrega": "-25.08913691721197, -50.15869448874851"
        },
        {
          "placa": "xyz-12445433",
          "modelo": "Fusca",
          "marca": "Fiat",
          "ano": "2012",
          "coordenadas_entrega": "-25.08913691721197, -50.15869448874851"
        },
        {
          "placa": "xyz-12443433",
          "modelo": "Fusca",
          "marca": "Fiat",
          "ano": "2012",
          "coordenadas_entrega": "-25.08913691721197, -50.15869448874851"
        },
        {
          "placa": "xyz-12444433",
          "modelo": "Fusca",
          "marca": "Fiat",
          "ano": "2012",
          "coordenadas_entrega": "-25.08913691721197, -50.15869448874851"
        },
        {
          "placa": "xyz-12444533",
          "modelo": "Fusca",
          "marca": "Fiat",
          "ano": "2012",
          "coordenadas_entrega": "-25.08913691721197, -50.15869448874851"
        },
        {
          "placa": "xyz-12469433",
          "modelo": "Fusca",
          "marca": "Fiat",
          "ano": "2012",
          "coordenadas_entrega": "-25.08913691721197, -50.15869448874851"
        },
        {
          "placa": "xyz-12447303",
          "modelo": "Fusca",
          "marca": "Fiat",
          "ano": "2012",
          "coordenadas_entrega": "-25.08913691721197, -50.15869448874851"
        },
        {
          "placa": "xyz-12484033",
          "modelo": "Fusca",
          "marca": "Fiat",
          "ano": "2012",
          "coordenadas_entrega": "-25.08913691721197, -50.15869448874851"
        },
        {
          "placa": "xyz-124840233",
          "modelo": "Fusca",
          "marca": "Fiat",
          "ano": "2012",
          "coordenadas_entrega": "-25.08913691721197, -50.15869448874851"
        }
      ]
  })
}

export const formatDate = (date: string | number | Date) => {
  const formatted = new Date(date).toISOString().split('T')[0];
  return formatted;
};