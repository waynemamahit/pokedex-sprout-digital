import { JSX, memo } from 'react';
import { PokemonDetail } from '../models/PokemonModel';
import PokemonAbout from './PokemonAbout';
import PokemonBaseStats from './PokemonBaseStats';
import PokemonCard from './PokemonCard';
import PokemonEvolution from './PokemonEvolution';
import PokemonMoves from './PokemonMoves';
import PokemonTypes from './PokemonTypes';
import Tabs, { TabType } from './Tabs';

export type PokemonDetailProps = {
  detail: PokemonDetail;
} & JSX.IntrinsicAttributes;

const tabs: TabType<PokemonDetailProps>[] = [
  {
    label: 'About',
    isActive: true,
    Component: PokemonAbout,
  },
  {
    label: 'Base Stats',
    isActive: false,
    Component: PokemonBaseStats,
  },
  {
    label: 'Evolution',
    isActive: false,
    Component: PokemonEvolution,
  },
  {
    label: 'Moves',
    isActive: false,
    Component: PokemonMoves,
  },
];

export default function PokemonDetailCard({
  detail,
  loading,
}: PokemonDetailProps & {
  loading: boolean;
}) {
  return (
    <PokemonCard className="w-full h-auto min-h-full max-h-full p-0 overflow-auto">
      {!loading ? (
        <>
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
            className="block w-[60%]  mx-auto"
            src={detail.sprites.other.home.front_default ?? ''}
            alt={detail.name}
            title={detail.name}
          />
          <div className="bg-white min-w-[500px] h-[60%] rounded-t-3xl border-blue pt-6">
            <Tabs<PokemonDetailProps> items={tabs} props={{ detail }} />
          </div>
        </>
      ) : (
        <span className="loading loading-spinner w-[40%] text-info mx-auto mt-[32%]"></span>
      )}
    </PokemonCard>
  );
}

export const MemoPokemonDetailCard = memo(PokemonDetailCard);
