import { useState, useEffect } from 'react';
import { PokemonDetail, PokemonEvolveChain } from '../models/PokemonModel';
import PokemonService from '../services/PokemonService';

export default function usePokemon() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<PokemonDetail[]>([]);
  const [detail, setDetail] = useState<PokemonDetail | null>(null);
  const [evolveLoad, setEvolveLoad] = useState(false);
  const [listEvolve, setListEvolve] = useState<PokemonEvolveChain[]>([]);

  const getList = async () => {
    const { data, message } = await PokemonService.getData();
    if (data === null) {
      alert(message);
    } else {
      const result: PokemonDetail[] = [];
      for (const dataItem of data.results) {
        const detailItem = await PokemonService.getDetail(dataItem.name);
        if (detailItem.data === null) continue;
        const name = detailItem.data.name.split('');
        name[0] = name[0].toUpperCase();
        detailItem.data.name = name.join('');
        let typeIndex = 0;
        for (const typeItem of detailItem.data.types) {
          const typeName = typeItem.type.name.split('');
          typeName[0] = typeName[0].toUpperCase();
          detailItem.data.types[typeIndex].type.name = typeName.join('');
          typeIndex++;
        }
        result.push(detailItem.data);
      }
      setList(result);
    }
    setLoading(false);
  };

  const showDetail = async (id: number) => {
    const result = list.find((item) => item.id === id);
    setDetail(typeof result !== 'undefined' ? result : null);
  };

  const showEvolution = async (id: string) => {
    setEvolveLoad(true);
    const { data, message } = await PokemonService.getEvolutionChain(id);
    if (data === null) {
      alert(message);
    } else {
      setListEvolve(data.chain.evolve_to);
    }
    setEvolveLoad(false);
  };

  useEffect(() => {
    getList();
  }, []);

  return {
    loading,
    list,
    detail,
    evolveLoad,
    listEvolve,
    showDetail,
    showEvolution,
  };
}
