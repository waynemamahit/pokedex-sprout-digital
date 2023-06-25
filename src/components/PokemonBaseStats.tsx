import { PokemonDetailProps } from './PokemonDetailCard';

export default function PokemonBaseStats({ detail }: PokemonDetailProps) {
  console.log('Base Stats');
  return <div>{JSON.stringify(detail.stats)}</div>;
}
