export const GRID_COLUMNS = { default: 1, sm: 2, md: 3, lg: 4 } as const;
export const ITEMS_PER_PAGE = 20;
export const SEARCH_DEBOUNCE_MS = 300;
export const SORT_OPTIONS = [
  { label: 'Name (A-Z)', value: 'name-asc' },
  { label: 'Name (Z-A)', value: 'name-desc' },
  { label: 'Price (Low to High)', value: 'price-asc' },
  { label: 'Price (High to Low)', value: 'price-desc' },
  { label: 'Rating (High to Low)', value: 'rating-desc' },
] as const;

export const CATEGORY_COLORS: Record<string, string> = {
  'fruits-vegetables': '#22c55e',
  'dairy-eggs': '#3b82f6',
  'bakery': '#f59e0b',
  'meat-seafood': '#ef4444',
  'beverages': '#8b5cf6',
  'snacks': '#f97316',
  'frozen-foods': '#06b6d4',
  'pantry-staples': '#a3722b',
};

export const CATEGORY_EMOJIS: Record<string, string> = {
  'fruits-vegetables': '\u{1F96C}',
  'dairy-eggs': '\u{1F95B}',
  'bakery': '\u{1F35E}',
  'meat-seafood': '\u{1F969}',
  'beverages': '\u2615',
  'snacks': '\u{1F37F}',
  'frozen-foods': '\u{1F9CA}',
  'pantry-staples': '\u{1FAD9}',
};
