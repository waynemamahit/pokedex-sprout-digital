import { memo, useEffect, useRef } from 'react';
import { PokemonDetail } from '../models/PokemonModel';
import PokemonCard from './PokemonCard';
import PokemonTypes from './PokemonTypes';

export default function PokemonList({
  list,
  next,
  onClick,
  showNextData,
}: {
  list: PokemonDetail[];
  next: string | null;
  onClick: (id: number) => void;
  showNextData: () => Promise<void>;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.addEventListener('scroll', () => {
        if (listRef.current) {
          if (
            Math.ceil(
              listRef.current.scrollTop + listRef.current.clientHeight + 2
            ) >= listRef.current.scrollHeight
          ) {
            showNextData();
          }
        }
      });
    }
  }, [showNextData]);

  return (
    <div
      className="grid grid-cols-2 gap-4 h-full overflow-auto px-2"
      ref={listRef}
    >
      {list.map((item) => (
        <PokemonCard
          key={item.id}
          className="cursor-pointer w-full h-full p-5 m-0"
          onClick={() => onClick(item.id)}
        >
          <h2 className="text-3xl font-bold text-white my-2">{item.name}</h2>
          <div className="flex">
            <div className="pr-3 flex-1">
              <PokemonTypes items={item.types} className="w-auto" />
            </div>
            <div className="flex-2">
              <img
                className="inline-block w-[160px]"
                src={item.sprites.other.home.front_default ?? ''}
                alt={item.name}
                title={item.name}
              />
            </div>
          </div>
        </PokemonCard>
      ))}
      {next ? (
        <span className="col-span-2 block loading loading-spinner w-[20%] text-primary mx-auto"></span>
      ) : null}
    </div>
  );
}

export const MemoPokemonList = memo(PokemonList);
