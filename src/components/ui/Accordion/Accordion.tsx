import { useState, type ReactNode } from 'react';
import { cn } from '../../../utils/helpers/classNames';

interface AccordionItem {
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  allowMultiple?: boolean;
}

export function Accordion({ items, className, allowMultiple = false }: AccordionProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className={cn('divide-y divide-surface-200 dark:divide-surface-700', className)}>
      {items.map((item, index) => {
        const isOpen = openIndices.has(index);
        return (
          <div key={item.title}>
            <button
              className="flex w-full items-center justify-between py-3 text-left text-sm font-medium text-surface-900 dark:text-surface-100"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
            >
              {item.title}
              <svg
                className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={cn(
                'overflow-hidden transition-all duration-200',
                isOpen ? 'max-h-96 pb-3' : 'max-h-0',
              )}
            >
              <div className="text-sm text-surface-600 dark:text-surface-400">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
