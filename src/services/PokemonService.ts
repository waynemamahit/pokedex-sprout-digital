import {
  PokemonBase,
  PokemonDetail,
  PokemonEvolveResponse,
  PokemonListResponse,
} from '../models/PokemonModel';
import Http from '../utils/Http';

const baseUrl = 'https://pokeapi.co/api/v2/';

const getData = async (query = '') =>
  await Http.get<PokemonListResponse<PokemonBase>>(
    baseUrl + 'pokemon' + (query.length > 0 ? `?${query}` : '')
  );

const getDetail = async (id: string) =>
  await Http.get<PokemonDetail>(baseUrl + 'pokemon/' + id);

const getEvolutionChain = async (id: string) =>
  await Http.get<PokemonEvolveResponse>(baseUrl + 'evolution-chain/' + id);

export default {
  getData,
  getDetail,
  getEvolutionChain,
};
