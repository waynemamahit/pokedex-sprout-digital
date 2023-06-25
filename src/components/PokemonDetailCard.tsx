import { useCallback, useState, memo } from 'react';
import { PokemonDetail } from '../models/PokemonModel';
import PokemonAbout from './PokemonAbout';
import PokemonBaseStats from './PokemonBaseStats';
import PokemonCard from './PokemonCard';
import PokemonEvolution from './PokemonEvolution';
import PokemonMoves from './PokemonMoves';
import PokemonTypes from './PokemonTypes';
import { MemoTabs, TabType } from './Tabs';

export interface PokemonDetailProps {
  detail: PokemonDetail;
}

export default function PokemonDetailCard({ detail }: PokemonDetailProps) {
  const [tabs, setTabs] = useState<TabType[]>([
    {
      label: 'About',
      isActive: true,
      children: PokemonAbout,
    },
    {
      label: 'Base Stats',
      isActive: false,
      children: PokemonBaseStats,
    },
    {
      label: 'Evolution',
      isActive: false,
      children: PokemonEvolution,
    },
    {
      label: 'Moves',
      isActive: false,
      children: PokemonMoves,
    },
  ]);

  const onChange = useCallback(
    (tabItem: TabType) => {
      const newTabs = tabs.map((newTabItem) => {
        newTabItem.isActive = newTabItem === tabItem;
        return newTabItem;
      });
      setTabs(newTabs);
    },
    [tabs]
  );

  return (
    <PokemonCard className="w-full h-auto max-h-full p-0 overflow-auto">
      <div className="flex justify-between align-middle mx-10 mt-4">
        <div>
          <h2 className="flex-col text-5xl font-bold text-white my-3">
            {detail.name}
          </h2>
          <PokemonTypes items={detail.types} />
        </div>
        <div className="flex-col flex justify-center align-middle text-xl text-end font-bold text-white">
          <span>#{detail.order}</span>
        </div>
      </div>
      <img
        className="block w-[75%]  mx-auto"
        src={detail.sprites.other.home.front_default ?? ''}
        alt={detail.name}
        title={detail.name}
      />
      <div className="bg-white h-[60%] rounded-t-3xl border-blue pt-6">
        <div className="tabs">
          <MemoTabs items={tabs} onClick={onChange} />
        </div>
        <div className="px-10 py-4">
          {tabs.find((tabItem) => tabItem.isActive)?.children({ detail }) ||
            null}
        </div>
      </div>
    </PokemonCard>
  );
}

export const MemoPokemonDetailCard = memo(PokemonDetailCard);
