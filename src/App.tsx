import { useCallback, useMemo } from 'react';
import './App.css';
import pokedexLogo from './assets/pokedex_logo.png';
import Modal from './components/Modal';
import { MemoPokemonDetailCard } from './components/PokemonDetailCard';
import { MemoPokemonList } from './components/PokemonList';
import { PokemonContext } from './context/PokemonContext';
import usePokemon from './hooks/usePokemon';

function App() {
  const { list, detail, detailLoad, next, getList, showNextData, showDetail } =
    usePokemon();

  const valueProvider = useMemo(
    () => ({
      showDetail,
    }),
    [showDetail]
  );

  const onRefresh = useCallback(() => {
    getList();
  }, [getList]);

  return (
    <PokemonContext.Provider value={valueProvider}>
      <Modal>
        <div className="flex flex-wrap-reverse">
          <div className="flex-auto md:flex-1 max-w-full h-screen relative p-1 pt-28 bg-[url('assets/side_bg.png')] bg-cover">
            <img
              className="absolute top-2 left-2 z-50 max-w-[230px]"
              src={pokedexLogo}
              alt="Pokedex"
              title="Pokedex"
            />
            <MemoPokemonList
              list={list}
              next={next}
              onRefresh={onRefresh}
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
            <div className="flex-auto md:flex-1 max-w-full h-screen p-6 mx-auto bg-[#c6ddff] overflow-auto">
              <MemoPokemonDetailCard detail={detail} loading={detailLoad} />
            </div>
          )}
        </div>
      </Modal>
    </PokemonContext.Provider>
  );
}

export default App;
