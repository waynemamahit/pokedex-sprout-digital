import { useCallback, useState } from 'react';

export interface TabType<ChildrenPropsType> {
  label: string;
  isActive: boolean;
  children: (props: ChildrenPropsType) => React.ReactNode;
}

export default function Tabs<ChildrenPropsType>({
  items,
  props,
}: {
  items: TabType<ChildrenPropsType>[];
  props: ChildrenPropsType;
}) {
  const [tabs, setTabs] = useState(items);

  const onChangeTab = useCallback(
    (tabItem: TabType<ChildrenPropsType>) => {
      const newTabs = tabs.map((newTabItem) => {
        newTabItem.isActive = newTabItem === tabItem;
        return newTabItem;
      });
      setTabs(newTabs);
    },
    [tabs]
  );
  return (
    <>
      <div className="tabs">
        {items.map((tabItem) => (
          <a
            onClick={() => onChangeTab(tabItem)}
            key={tabItem.label}
            className={
              'h-auto text-[100%] pb-6 transition tab tab-bordered tab-lg w-1/4 ' +
              (tabItem.isActive
                ? 'tab-active !border-blue-600 font-bold'
                : 'border-none')
            }
          >
            {tabItem.label}
          </a>
        ))}
      </div>
      <div className="px-10 py-4">
        {tabs.find((tabItem) => tabItem.isActive)?.children(props) || null}
      </div>
    </>
  );
  return;
}
