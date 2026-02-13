import React from 'react';
import { cn } from '../../../utils/helpers/classNames';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

const positionStyles: Record<NonNullable<TooltipProps['position']>, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const arrowStyles: Record<NonNullable<TooltipProps['position']>, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-900 border-x-transparent border-b-transparent border-4',
  bottom:
    'bottom-full left-1/2 -translate-x-1/2 border-b-gray-900 border-x-transparent border-t-transparent border-4',
  left: 'left-full top-1/2 -translate-y-1/2 border-l-gray-900 border-y-transparent border-r-transparent border-4',
  right:
    'right-full top-1/2 -translate-y-1/2 border-r-gray-900 border-y-transparent border-l-transparent border-4',
};

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  className,
}) => {
  return (
    <div className="group relative inline-flex">
      {children}
      <div
        className={cn(
          'absolute z-50 hidden group-hover:block',
          'pointer-events-none',
          positionStyles[position],
          className
        )}
        role="tooltip"
      >
        <div className="relative px-2.5 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-md whitespace-nowrap shadow-lg">
          {content}
          <span className={cn('absolute w-0 h-0', arrowStyles[position])} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Tooltip);
