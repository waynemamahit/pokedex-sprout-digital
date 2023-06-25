import { useCallback, useEffect, useState } from 'react';
import { PokemonDetail, PokemonEvolveChain } from '../models/PokemonModel';
import PokemonService from '../services/PokemonService';

export default function usePokemon() {
  const [list, setList] = useState<PokemonDetail[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [detail, setDetail] = useState<PokemonDetail | null>(null);
  const [evolveLoad, setEvolveLoad] = useState(false);
  const [listEvolve, setListEvolve] = useState<PokemonEvolveChain[]>([]);

  const processList = async (query = '') => {
    const { data, message } = await PokemonService.getData(query);
    const result: PokemonDetail[] = [];
    if (data === null) {
      alert(message);
    } else {
      setNext(data.next ? data.next.split('?')[1] : null);
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
    }
    return result;
  };

  const getList = useCallback(async () => {
    setList(await processList());
  }, [setList]);

  const showDetail = useCallback(
    async (id: number) => {
      const result = list.find((item) => item.id === id);
      setDetail(result || null);
    },
    [list]
  );

  const showEvolution = useCallback(
    async (id: string) => {
      setEvolveLoad(true);
      const { data, message } = await PokemonService.getEvolutionChain(id);
      if (data === null) {
        alert(message);
      } else {
        setListEvolve(data.chain.evolve_to);
      }
      setEvolveLoad(false);
    },
    [setEvolveLoad, setListEvolve]
  );

  const showNextData = useCallback(async () => {
    if (next !== null) {
      const mapStringify = (itemList: PokemonDetail) =>
        JSON.stringify(itemList);
      const newList = (await processList(next)).map(mapStringify);
      setList((prevState) =>
        [...new Set([...prevState.map(mapStringify), ...newList])].map(
          (listItem: string) => JSON.parse(listItem)
        )
      );
    }
  }, [next, setList]);

  useEffect(() => {
    getList();
  }, [getList]);

  return {
    list,
    detail,
    evolveLoad,
    listEvolve,
    next,
    showNextData,
    showDetail,
    showEvolution,
  };
}
