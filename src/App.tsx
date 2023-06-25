import { useEffect, useRef } from 'react';
import './App.css';
import pokedexLogo from './assets/pokedex_logo.png';
import PokemonCard from './components/PokemonCard';
import { MemoPokemonDetailCard } from './components/PokemonDetailCard';
import PokemonTypes from './components/PokemonTypes';
import usePokemon from './hooks/usePokemon';

function App() {
  const { list, detail, next, showNextData, showDetail } = usePokemon();
  const listRef = useRef<HTMLDivElement>(null);

  const onClickDetail = (id: number) => {
    window.scrollTo({
      top: 0,
    });
    showDetail(id);
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.addEventListener('scroll', () => {
        if (listRef.current) {
          if (
            Math.ceil(
              listRef.current.scrollTop + listRef.current.clientHeight
            ) === listRef.current.scrollHeight
          ) {
            showNextData();
          }
        }
      });
    }
  }, [showNextData]);

  return (
    <div className="flex flex-wrap-reverse">
      <div className="flex-col sm:flex-auto flex-2 relative w-[500px] h-[100vh] p-1 pt-28 bg-[url('assets/side_bg.png')] bg-cover">
        <img
          className="absolute top-2 left-2 z-50 max-w-[245px]"
          src={pokedexLogo}
          alt="Pokedex"
          title="Pokedex"
        />
        <div
          className="grid grid-cols-2 gap-4 h-full overflow-auto px-6"
          ref={listRef}
        >
          {list.map((item) => (
            <PokemonCard
              key={item.id}
              className="cursor-pointer w-full h-full p-5 m-0"
              onClick={() => onClickDetail(item.id)}
            >
              <h2 className="text-3xl font-bold text-white my-2">
                {item.name}
              </h2>
              <div className="flex">
                <div className="pr-4 flex-1">
                  <PokemonTypes items={item.types} className="w-auto" />
                </div>
                <div className="flex-2">
                  <img
                    className="inline-block w-[200px]"
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
      </div>
      {detail && (
        <div className="flex-col p-6 max-w-[550px] h-screen mx-auto">
          <MemoPokemonDetailCard detail={detail} />
        </div>
      )}
    </div>
  );
}

export default App;
