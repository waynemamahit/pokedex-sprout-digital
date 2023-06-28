import {
  PokemonBase,
  PokemonDetail,
  PokemonEvolveResponse,
  PokemonListResponse,
  PokemonSpeciesResponse,
} from '../models/PokemonModel';
import Http from '../utils/Http';

const baseUrl = 'https://pokeapi.co/api/v2/';

const getData = async (query = '') =>
  await Http.get<PokemonListResponse<PokemonBase>>(
    baseUrl + 'pokemon' + (query.length > 0 ? `?${query}` : '')
  );

const getDetail = async (id: string) =>
  await Http.get<PokemonDetail>(baseUrl + 'pokemon/' + id);

const getSpecies = async (url: string) =>
  await Http.get<PokemonSpeciesResponse>(url);

const getEvolutionChain = async (url: string = baseUrl) =>
  await Http.get<PokemonEvolveResponse>(url);

export default {
  getData,
  getDetail,
  getSpecies,
  getEvolutionChain,
};
