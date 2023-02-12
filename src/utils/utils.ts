import axios from 'axios';
import { IVeiculo, TiposServicos } from '../interfaces';
import { ValidationError } from '../utils/erros';

async function getAddressFromCoordinates(coordinates: string): Promise<string> {
  const coordinatesRegex = /^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$/;
  if (!coordinatesRegex.test(coordinates)) {
    throw new ValidationError(`Coordenada inválida: ${coordinates}`);
  }

  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates}&key=${process.env.API_KEY}`);
    const address = response.data.results[0].formatted_address;
    return address;
  } catch (error) {
    throw new ValidationError(`Erro ao obter endereço da coordenada: ${coordinates} verifique a validade da mesma.`);
  }
}

export async function getBestRoute(veiculos: IVeiculo[], origem: string) {
  const originCoordinates = origem;
  const originAddress = await getAddressFromCoordinates(originCoordinates);

  const addresses = await Promise.all(veiculos.map(async veiculo => ({
    placa: veiculo.placa,
    address: await getAddressFromCoordinates(veiculo.coordenadas_entrega),
  })));

  const destinations = addresses.map(veiculo => veiculo.address).join('|');
  const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originAddress}&destinations=${destinations}&key=${process.env.API_KEY}`);

  const distances = response.data.rows[0].elements;
  return addresses.map((veiculo, index) => ({
    placa: veiculo.placa,
    endereco_entrega: veiculo.address,
    distancia_total: distances[index].distance.value/1000,
    address: addresses[index],
    duracao_total: distances[index].duration.value,
    ordem_de_entrega: index + 1,
  }));
}

export function calculateTotalDistance(routes: { distancia_total: number; duracao_total: number; }[]): { totalDistance: number; totalDuration: number; } {
  let totalDistance = 0;
  let totalDuration = 0;

  routes.forEach(route => {
    totalDistance += route.distancia_total;
    totalDuration += route.duracao_total;
  });

  return {
    totalDistance,
    totalDuration,
  };
}

const valoresPorServico: TiposServicos = {
  Guincho: {
    valorFixo: 120,
    valorPorKm: 1.37,
  },
  Cegonha: {
    valorFixo: 370,
    valorPorKm: 5.33,
  },
};

export function calculateTotalValue(tipoServico: string, distanciaTotal: number): number {
  const valores = valoresPorServico[tipoServico];

  if (!valores) {
    return 0;
  }

  const { valorFixo, valorPorKm } = valores;
  return distanciaTotal > 20 ? (distanciaTotal - 20) * valorPorKm + valorFixo : valorFixo;
}
