// ---------------------------------------------------------------------------
// Camera
// ---------------------------------------------------------------------------
export const CAMERA = {
  POSITION: [0, 8, 15] as const,
  FOV: 60,
  NEAR: 0.1,
  FAR: 1000,
} as const;

// ---------------------------------------------------------------------------
// Shelf
// ---------------------------------------------------------------------------
export const SHELF = {
  WIDTH: 4,
  HEIGHT: 3,
  DEPTH: 1,
  SPACING: 1.2,
  TIERS: 4,
} as const;

// ---------------------------------------------------------------------------
// Product display
// ---------------------------------------------------------------------------
export const PRODUCT_DISPLAY = {
  SCALE: 0.8,
  HOVER_LIFT: 0.3,
  SELECTION_GLOW_INTENSITY: 1.5,
  SELECTION_GLOW_COLOR: '#4ade80',
} as const;

// ---------------------------------------------------------------------------
// Aisle layout
// ---------------------------------------------------------------------------
export const AISLE = {
  WIDTH: 3,
  LENGTH: 20,
  COUNT: 4,
} as const;

// ---------------------------------------------------------------------------
// Lighting
// ---------------------------------------------------------------------------
export const LIGHTING = {
  AMBIENT_INTENSITY: 0.4,
  DIRECTIONAL_INTENSITY: 0.8,
  DIRECTIONAL_POSITION: [10, 20, 10] as const,
} as const;

// ---------------------------------------------------------------------------
// Animation durations (seconds)
// ---------------------------------------------------------------------------
export const ANIMATION = {
  CAMERA_TRANSITION_S: 1.5,
  PRODUCT_HOVER_S: 0.3,
  SELECTION_S: 0.5,
} as const;

// ---------------------------------------------------------------------------
// Performance thresholds
// ---------------------------------------------------------------------------
export const PERFORMANCE = {
  MAX_INSTANCES: 200,
  LOD_DISTANCES: [5, 15, 30] as const,
} as const;

// ---------------------------------------------------------------------------
// Floor dimensions
// ---------------------------------------------------------------------------
export const FLOOR = {
  WIDTH: 30,
  DEPTH: 25,
} as const;

// ---------------------------------------------------------------------------
// Store colours
// ---------------------------------------------------------------------------
export const STORE_COLORS = {
  FLOOR: '#e8e0d4',
  WALL: '#f5f0eb',
  SHELF_WOOD: '#8b6b4a',
  SHELF_METAL: '#a0a0a0',
  CEILING: '#fafafa',
  ACCENT_PRIMARY: '#22c55e',
  ACCENT_SECONDARY: '#3b82f6',
  AMBIENT_LIGHT: '#ffffff',
  DIRECTIONAL_LIGHT: '#fffbe6',
} as const;
