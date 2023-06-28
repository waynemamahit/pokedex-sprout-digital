import { createContext } from 'react';

type PokemonContextProps = {
  showDetail: (id: number | string) => Promise<void>;
};

export const PokemonContext = createContext<PokemonContextProps | null>(null);
