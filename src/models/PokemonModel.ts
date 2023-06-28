export class PokemonBase {
  name = '';
  url = '';
}

export interface PokemonListResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export class PokemonDetail {
  id = 0;
  name = 'LALALLALAL';
  order = 0;
  types: PokemonType[] = [];
  height = 0;
  weight = 0;
  abilities: PokemonAbility[] = [];
  stats: PokemonStat[] = [];
  moves: PokemonMove[] = [];
  sprites = new PokemonSprite();
  species = new PokemonBase();
}

export interface PokemonType {
  slot: number;
  type: PokemonBase;
}

export interface PokemonAbility {
  ability: PokemonBase;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: PokemonBase;
}

export class PokemonEvolveChain {
  species: PokemonBase = new PokemonBase();
  evolves_to: PokemonEvolveChain[] = [];
}

export class PokemonEvolveResponse {
  id = 0;
  chain = new PokemonEvolveChain();
}

export interface PokemonMove {
  move: PokemonBase;
}

export class PokemonSpriteRef {
  back_default?: string | null = null;
  back_female?: string | null = null;
  back_shiny?: string | null = null;
  back_shiny_female?: string | null = null;
  front_default?: string | null = null;
  front_female?: string | null = null;
  front_shiny?: string | null = null;
  front_shiny_female?: string | null = null;
}

export class PokemonSprite extends PokemonSpriteRef {
  other = new PokemonSpriteOther();
}

export class PokemonSpriteOther {
  dream_world = new PokemonSpriteRef();
  home = new PokemonSpriteRef();
}

export interface PokemonSpeciesResponse {
  evolution_chain: PokemonBase;
}
