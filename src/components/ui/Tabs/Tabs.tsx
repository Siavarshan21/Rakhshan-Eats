import { useState, type ReactNode } from 'react';
import { cn } from '../../../utils/helpers/classNames';

interface TabItem {
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultIndex?: number;
  className?: string;
}

export function Tabs({ items, defaultIndex = 0, className }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div className={className}>
      <div className="flex border-b border-surface-200 dark:border-surface-700" role="tablist">
        {items.map((item, index) => (
          <button
            key={item.label}
            role="tab"
            aria-selected={activeIndex === index}
            className={cn(
              'px-4 py-2.5 text-sm font-medium transition-colors',
              activeIndex === index
                ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400'
                : 'text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200',
            )}
            onClick={() => setActiveIndex(index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="pt-4" role="tabpanel">
        {items[activeIndex]?.content}
      </div>
    </div>
  );
}
