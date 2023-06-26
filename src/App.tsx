import './App.css';
import pokedexLogo from './assets/pokedex_logo.png';
import { MemoPokemonDetailCard } from './components/PokemonDetailCard';
import { MemoPokemonList } from './components/PokemonList';
import usePokemon from './hooks/usePokemon';

function App() {
  const { list, detail, next, showNextData, showDetail } = usePokemon();

  return (
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
        <div className="flex-col p-6 max-w-[600px] h-screen mx-auto">
          <MemoPokemonDetailCard detail={detail} />
        </div>
      )}
    </div>
  );
}

export default App;
