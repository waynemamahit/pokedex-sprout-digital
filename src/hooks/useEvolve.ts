import { useCallback, useContext, useState } from 'react';
import { PokemonEvolveChain } from '../models/PokemonModel';
import PokemonService from '../services/PokemonService';
import { ModalContext } from '../context/ModalContext';

export default function useEvolve() {
  const [evolveLoad, setEvolveLoad] = useState(true);
  const [chain, setChain] = useState<PokemonEvolveChain>(
    new PokemonEvolveChain()
  );
  const modal = useContext(ModalContext);

  const showEvolution = useCallback(
    async (url: string) => {
      setEvolveLoad(true);
      const { data: species, message: speciesMessage } =
        await PokemonService.getSpecies(url);
      if (species === null) {
        setEvolveLoad(false);
        modal?.showModal({ message: speciesMessage });
        return;
      }
      const { data, message } = await PokemonService.getEvolutionChain(
        species.evolution_chain.url
      );
      if (data === null) {
        modal?.showModal({ message: message });
      } else {
        setChain(data.chain);
      }
      setEvolveLoad(false);
    },
    [setEvolveLoad, setChain, modal]
  );

  return {
    evolveLoad,
    chain,
    showEvolution,
  };
}
