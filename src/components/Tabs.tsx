import { memo } from 'react';
import { PokemonDetailProps } from './PokemonDetailCard';

export interface TabType {
  label: string;
  isActive: boolean;
  children: ({ detail }: PokemonDetailProps) => JSX.Element;
}

export default function Tabs({
  items,
  onClick,
}: {
  items: TabType[];
  onClick: (tabItem: TabType) => void;
}) {
  return items.map((tabItem) => (
    <a
      onClick={() => onClick(tabItem)}
      key={tabItem.label}
      className={
        'h-auto text-sm pb-6 transition tab tab-bordered tab-lg w-1/4 ' +
        (tabItem.isActive
          ? 'tab-active !border-blue-600 font-bold'
          : 'border-none')
      }
    >
      {tabItem.label}
    </a>
  ));
}

export const MemoTabs = memo(Tabs);
