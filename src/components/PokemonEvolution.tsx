import { For } from 'million/react';
import { useContext, useEffect } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import useEvolve from '../hooks/useEvolve';
import { PokemonEvolveChain } from '../models/PokemonModel';
import Alert from './Alert';
import { PokemonDetailProps } from './PokemonDetailCard';

export default function PokemonEvolution({ detail }: PokemonDetailProps) {
  const { chain, evolveLoad, showEvolution } = useEvolve();
  const context = useContext(PokemonContext);

  const onRefresh = () => showEvolution(detail.species.url);

  const renderChain = (chain: PokemonEvolveChain) => (
    <li
      key={chain.species.name}
      onClick={(evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        evt.stopPropagation();
        context?.showDetail(chain.species.name);
      }}
    >
      <a>{chain.species.name.toUpperCase()}</a>
      {chain.evolves_to.length > 0 && (
        <ul>
          <For each={chain.evolves_to}>
            {(evolveItem) => renderChain(evolveItem)}
          </For>
        </ul>
      )}
    </li>
  );

  useEffect(() => {
    showEvolution(detail.species.url);
  }, [showEvolution, detail]);

  return evolveLoad ? (
    <progress className="progress progress-info w-full"></progress>
  ) : (
    <div className="flex justify-center">
      {chain ? (
        <ul className="menu bg-cyan-100 text-cyan-900 shadow-md font-bold w-3/4 rounded-box">
          {renderChain(chain)}
        </ul>
      ) : (
        <Alert message="Data evolution not found!" onClick={onRefresh} />
      )}
    </div>
  );
}
