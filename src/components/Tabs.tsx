import { JSX, ReactElement, ReactNode, useCallback, useState } from 'react';

export interface TabType<ChildrenPropsType> {
  label: string;
  isActive: boolean;
  Component: (props: ChildrenPropsType) => ReactNode | ReactElement;
}

export default function Tabs<
  ChildrenPropsType extends JSX.IntrinsicAttributes
>({
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
      <div role="tablist" className="tabs tabs-bordered tabs-sm overflow-auto">
        {tabs.map((tabItem) => (
          <button
            onClick={() => onChangeTab(tabItem)}
            key={tabItem.label}
            className={
              'h-auto text-[100%] pb-5 leading-6 transition tab ' +
              (tabItem.isActive
                ? 'tab-active !border-blue-600 font-bold'
                : 'border-none')
            }
          >
            {tabItem.label}
          </button>
        ))}
      </div>
      <div className="px-10 py-4">
        {tabs.map(({ label, isActive, Component }) => {
          return isActive && <Component key={label} {...props} />;
        })}
      </div>
    </>
  );
}
