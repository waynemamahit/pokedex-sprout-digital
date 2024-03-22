import { PokemonType } from '../models/PokemonModel';

export default function PokemonTypes({
  items,
  className = '',
}: {
  items: PokemonType[];
  className?: string;
}) {
  return items.map((typeItem) => (
    <button
      key={typeItem.slot}
      className={
        'inline-block rounded-2xl py-1 px-2 mr-1 mt-1 border border-white text-sm bg-white bg-opacity-10 text-white font-semibold ' +
        className
      }
    >
      {typeItem.type.name}
    </button>
  ));
}
