import { useMemo } from 'react';
import './App.css';
import pokedexLogo from './assets/pokedex_logo.png';
import { MemoPokemonDetailCard } from './components/PokemonDetailCard';
import { MemoPokemonList } from './components/PokemonList';
import { PokemonContext } from './context/PokemonContext';
import usePokemon from './hooks/usePokemon';

function App() {
  const { list, detail, detailLoad, next, showNextData, showDetail } =
    usePokemon();

  const valueProvider = useMemo(
    () => ({
      showDetail,
    }),
    [showDetail]
  );

  return (
    <PokemonContext.Provider value={valueProvider}>
      <div className="flex flex-wrap-reverse">
        <div className="flex-col sm:flex-auto flex-2 relative w-[500px] h-[100vh] p-1 pt-28 bg-[url('assets/side_bg.png')] bg-cover">
          <img
            className="absolute top-2 left-2 z-50 max-w-[245px]"
            src={pokedexLogo}
            alt="Pokedex"
            title="Pokedex"
          />
          <MemoPokemonList
            list={list}
            next={next}
            onClick={(id: number) => {
              window.scrollTo({
                top: 0,
              });
              showDetail(id);
            }}
            showNextData={showNextData}
          />
        </div>
        {detail && (
          <div className="flex-col p-6 min-w-[600px] align-middle h-screen mx-auto">
            <MemoPokemonDetailCard detail={detail} loading={detailLoad} />
          </div>
        )}
      </div>
    </PokemonContext.Provider>
  );
}

export default App;
