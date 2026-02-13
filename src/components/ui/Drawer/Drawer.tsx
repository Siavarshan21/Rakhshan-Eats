import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../../utils/helpers/classNames';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right';
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
  showCloseButton?: boolean;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  position = 'right',
  title,
  children,
  footer,
  width = 'w-80 sm:w-96',
  showCloseButton = true,
  closeOnOverlay = true,
  closeOnEscape = true,
  className,
}) => {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) {
        onClose();
      }
    },
    [onClose, closeOnEscape]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnOverlay) {
      onClose();
    }
  };

  const slideDirection = position === 'right' ? 'translate-x-full' : '-translate-x-full';

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={cn(
          'fixed inset-y-0 flex flex-col bg-white shadow-2xl',
          'transition-transform duration-300 ease-out',
          width,
          position === 'right' ? 'right-0' : 'left-0',
          isOpen ? 'translate-x-0' : slideDirection,
          className
        )}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 shrink-0">
            {title && (
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className={cn(
                  'ml-auto inline-flex items-center justify-center rounded-full',
                  'h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100',
                  'transition-colors duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-emerald-500'
                )}
                aria-label="Close drawer"
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="px-4 py-3 border-t border-gray-200 shrink-0">{footer}</div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default React.memo(Drawer);
