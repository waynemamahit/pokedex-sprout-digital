import { PokemonDetailProps } from './PokemonDetailCard';

export default function PokemonMoves({ detail }: PokemonDetailProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {detail.moves.map((moveItem) => (
        <ul
          key={moveItem.move.name}
          className="max-w-md space-y-1 text-gray-700 list-disc list-inside"
        >
          <li key={moveItem.move.name} className="flex items-center">
            <svg
              className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="font-semibold">
              {moveItem.move.name.toUpperCase()}
            </span>
          </li>
        </ul>
      ))}
    </div>
  );
}
