import { For } from 'million/react';
import { PokemonStat } from '../models/PokemonModel';
import { PokemonDetailProps } from './PokemonDetailCard';

export default function PokemonBaseStats({ detail }: PokemonDetailProps) {
  const statIndicators = [
    'progress-error',
    'progress-warning',
    'progress-info',
    'progress-success',
    'progress-accent',
    'progress-secondary',
    'progress-primary',
  ];

  return (
    <For each={detail.stats}>
      {(statItem: PokemonStat, index: number) => (
        <div key={statItem.stat.name} className="grid grid-cols-6 gap-3 my-3">
          <div className="col-span-2">{statItem.stat.name.toUpperCase()}</div>
          <div className="col-span-1 font-bold text-center">
            {statItem.base_stat}
          </div>
          <div className="col-span-3">
            <progress
              className={'progress w-full ' + statIndicators[index]}
              value={statItem.base_stat}
              max="250"
            ></progress>
          </div>
        </div>
      )}
    </For>
  );
}
