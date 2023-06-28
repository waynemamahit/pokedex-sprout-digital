import { useCallback, useEffect, useState } from 'react';
import { PokemonDetail } from '../models/PokemonModel';
import PokemonService from '../services/PokemonService';

export default function usePokemon() {
  const [detail, setDetail] = useState<PokemonDetail | null>(null);
  const [detailLoad, setDetailLoad] = useState(false);
  const [list, setList] = useState<PokemonDetail[]>([]);
  const [next, setNext] = useState<string | null>(null);

  const processDetail = useCallback(async (id: string) => {
    const detailItem = await PokemonService.getDetail(id);
    if (detailItem.data === null) return detailItem;
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
    return detailItem;
  }, []);

  const processList = useCallback(
    async (query = '') => {
      const { data, message } = await PokemonService.getData(query);
      const result: PokemonDetail[] = [];
      if (data === null) {
        alert(message);
      } else {
        setNext(data.next ? data.next.split('?')[1] : null);
        for (const dataItem of data.results) {
          const detailItem = await processDetail(dataItem.name);
          if (detailItem.data === null) continue;
          result.push(detailItem.data);
        }
      }
      return result;
    },
    [setNext, processDetail]
  );

  const getList = useCallback(async () => {
    setList(await processList());
  }, [setList, processList]);

  const showDetail = useCallback(
    async (id: number | string) => {
      const result = list.find((item) => item.id === id || item.name === id);
      if (typeof result !== 'undefined') {
        setDetail(result);
      } else {
        setDetailLoad(true);
        const { data, message } = await processDetail(id.toString());
        if (data === null) {
          alert(message);
        } else {
          setDetail(data);
          setList([...list, data]);
        }
        setDetailLoad(false);
      }
    },
    [list, processDetail, setDetail, setDetailLoad]
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
  }, [next, setList, processList]);

  useEffect(() => {
    getList();
  }, [getList]);

  return {
    list,
    detail,
    detailLoad,
    next,
    showNextData,
    showDetail,
  };
}
