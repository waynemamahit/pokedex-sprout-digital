import { useContext, useEffect } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import useEvolve from '../hooks/useEvolve';
import { PokemonEvolveChain } from '../models/PokemonModel';
import { PokemonDetailProps } from './PokemonDetailCard';

export default function PokemonEvolution({ detail }: PokemonDetailProps) {
  const { chain, evolveLoad, showEvolution } = useEvolve();
  const context = useContext(PokemonContext);

  useEffect(() => {
    showEvolution(detail.species.url);
  }, [showEvolution, detail]);

  return evolveLoad ? (
    <progress className="progress progress-info w-full"></progress>
  ) : (
    <div className="flex justify-center">
      <ul className="steps steps-vertical">
        {(() => {
          let evolves = chain.evolves_to;
          const result: PokemonEvolveChain[] = [chain];
          while (evolves.length > 0) {
            const evolveChainItem = evolves[0];
            result.push(evolveChainItem);
            evolves = evolveChainItem.evolves_to;
          }
          return result.map((resultItem) => (
            <li
              key={resultItem.species.name}
              className="step step-info cursor-pointer font-bold transition hover:text-info"
              onClick={() => context?.showDetail(resultItem.species.name)}
            >
              {resultItem.species.name.toUpperCase()}
            </li>
          ));
        })()}
      </ul>
    </div>
  );
}
