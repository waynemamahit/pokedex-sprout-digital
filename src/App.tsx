import './App.css';
import usePokemon from './hooks/usePokemon';

function App() {
  const { list } = usePokemon();

  return (
    <div className="flex">
      <div className="flex-col w-[745px] h-[100vh] overflow-auto bg-[url('assets/side_bg.png')] bg-contain">
        <div className="p-1">
          {list.map((item) => (
            <div
              key={item.id}
              className="card max-w-[325px] lg:max-w-[340px] h-full inline-block p-5 m-2 shadow-xl bg-[url('assets/bg-card.png')] bg-cover mix-blend-normal bg-opacity-30 bg-red"
            >
              <h2 className="text-3xl font-bold text-white my-2">
                {item.name}
              </h2>
              <div className="flex">
                <div className="p-4 flex-1">
                  {item.types.map((typeItem) => (
                    <a
                      key={typeItem.slot}
                      href={typeItem.type.url}
                      className="badge badge-outline block badge-lg my-1 bg-white bg-opacity-10 text-white font-semibold"
                    >
                      {typeItem.type.name}
                    </a>
                  ))}
                </div>
                <div className="flex-1">
                  <img
                    className=" block w-full h-full"
                    src={item.sprites.other.home.front_default ?? ''}
                    alt={item.name}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-col flex-1 bg-[url('https://cdn.dribbble.com/users/5621307/screenshots/14102635/media/71cf4697a032080dc7c76289e8de450e.jpg?compress=1&resize=400x300')]"></div>
      </div>
    </div>
  );
}

export default App;
