import { useCallback, useState } from 'react';
import { PokemonEvolveChain } from '../models/PokemonModel';
import PokemonService from '../services/PokemonService';

export default function useEvolve() {
  const [evolveLoad, setEvolveLoad] = useState(true);
  const [chain, setChain] = useState<PokemonEvolveChain>(
    new PokemonEvolveChain()
  );

  const showEvolution = useCallback(
    async (url: string) => {
      setEvolveLoad(true);
      const { data: species, message: speciesMessage } =
        await PokemonService.getSpecies(url);
      if (species === null) {
        setEvolveLoad(false);
        alert(speciesMessage);
        return;
      }
      const { data, message } = await PokemonService.getEvolutionChain(
        species.evolution_chain.url
      );
      if (data === null) {
        alert(message);
      } else {
        setChain(data.chain);
      }
      setEvolveLoad(false);
    },
    [setEvolveLoad, setChain]
  );

  return {
    evolveLoad,
    chain,
    showEvolution,
  };
}
