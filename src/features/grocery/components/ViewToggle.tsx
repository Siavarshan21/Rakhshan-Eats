import { cn } from '../../../utils/helpers/classNames';
import { useFilterStore } from '../store/filter.store';

export function ViewToggle() {
  const { viewMode, setViewMode } = useFilterStore();

  return (
    <div className="inline-flex rounded-lg border border-gray-300 bg-white">
      {/* 2D Grid view */}
      <button
        type="button"
        onClick={() => setViewMode('2d')}
        className={cn(
          'flex items-center gap-1.5 rounded-l-lg px-3 py-2 text-sm font-medium transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset',
          viewMode === '2d'
            ? 'bg-emerald-600 text-white'
            : 'text-gray-600 hover:bg-gray-50',
        )}
        aria-label="Grid view"
      >
        {/* Grid icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
        2D
      </button>

      {/* 3D Scene view */}
      <button
        type="button"
        onClick={() => setViewMode('3d')}
        className={cn(
          'flex items-center gap-1.5 rounded-r-lg px-3 py-2 text-sm font-medium transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset',
          viewMode === '3d'
            ? 'bg-emerald-600 text-white'
            : 'text-gray-600 hover:bg-gray-50',
        )}
        aria-label="3D view"
      >
        {/* Cube icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
        3D
      </button>
    </div>
  );
}
