import { PokemonDetailProps } from './PokemonDetailCard';

const fixedNumber = (num: number) => parseFloat(String(num)).toFixed(2);

export default function PokemonAbout({ detail }: PokemonDetailProps) {
  const form: { [propKey: string]: string } = {
    Species: detail.species.name,
    Height: `${fixedNumber(detail.height * 3.93701)}" (${fixedNumber(
      detail.height * 10
    )} cm)`,
    Weight: `${fixedNumber(detail.weight * 0.220462)} lbs (${fixedNumber(
      detail.weight / 10
    )} kg)`,
    Abilities: detail.abilities
      .map((abilityItem) => {
        const name = abilityItem.ability.name.split('');
        name[0] = name[0].toUpperCase();
        return name.join('');
      })
      .join(', '),
  };

  const info = [];
  for (const key in form) {
    if (Object.prototype.hasOwnProperty.call(form, key)) {
      const value = form[key].split('');
      value[0] = value[0].toUpperCase();
      info.push(
        <div key={key} className="flex pt-2">
          <div className="flex-1 max-w-[100px]">{key}</div>
          <div className="flex-2 font-bold">{value.join('')}</div>
        </div>
      );
    }
  }

  return <>{info}</>;
}
