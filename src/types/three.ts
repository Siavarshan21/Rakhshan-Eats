// ---------------------------------------------------------------------------
// Three.js / 3-D Scene Types
// ---------------------------------------------------------------------------

import type { Vector3Tuple } from 'three';

// ---------------------------------------------------------------------------
// Performance
// ---------------------------------------------------------------------------

/** Rendering quality tier that drives LOD, shadow quality, and effect toggles. */
export type PerformanceLevel = 'low' | 'medium' | 'high';

// ---------------------------------------------------------------------------
// Camera
// ---------------------------------------------------------------------------

/**
 * Configuration for the scene's perspective camera.
 */
export interface CameraConfig {
  /** Camera world position `[x, y, z]`. */
  position: Vector3Tuple;
  /** The point the camera looks at `[x, y, z]`. */
  target: Vector3Tuple;
  /** Vertical field of view in degrees. */
  fov: number;
  /** Near clipping plane distance. */
  near: number;
  /** Far clipping plane distance. */
  far: number;
}

// ---------------------------------------------------------------------------
// Lighting
// ---------------------------------------------------------------------------

/** Supported Three.js light types. */
export type LightType = 'ambient' | 'directional' | 'point' | 'spot' | 'hemisphere';

/**
 * Describes a single light source in the scene.
 */
export interface LightConfig {
  /** Discriminator for the light type. */
  type: LightType;
  /** World position `[x, y, z]` (ignored for ambient / hemisphere lights). */
  position: Vector3Tuple;
  /** CSS-style colour string (e.g. `"#ffffff"`). */
  color: string;
  /** Light intensity multiplier. */
  intensity: number;
  /** Whether the light casts shadows (only directional / spot / point). */
  castShadow: boolean;
  /** Optional ground colour for hemisphere lights. */
  groundColor?: string;
  /** Optional shadow map size (width = height). */
  shadowMapSize?: number;
}

// ---------------------------------------------------------------------------
// Materials
// ---------------------------------------------------------------------------

/**
 * Serialisable material configuration applied to shelf / product meshes.
 */
export interface MaterialConfig {
  /** CSS-style base colour string. */
  color: string;
  /** Metalness factor (0 = dielectric, 1 = fully metallic). */
  metalness: number;
  /** Roughness factor (0 = mirror, 1 = fully rough). */
  roughness: number;
  /** Optional texture map URL. */
  mapUrl?: string;
  /** Optional normal map URL. */
  normalMapUrl?: string;
  /** Opacity (0 = invisible, 1 = fully opaque). */
  opacity: number;
  /** Whether the material is rendered as transparent. */
  transparent: boolean;
}

// ---------------------------------------------------------------------------
// Shelf
// ---------------------------------------------------------------------------

/**
 * Configuration for a 3-D grocery shelf unit.
 */
export interface ShelfConfig {
  /** Unique shelf identifier. */
  id: string;
  /** World position of the shelf `[x, y, z]`. */
  position: Vector3Tuple;
  /** Euler rotation of the shelf `[x, y, z]` in radians. */
  rotation: Vector3Tuple;
  /** Scale multiplier `[x, y, z]`. */
  scale: Vector3Tuple;
  /** Number of horizontal shelf rows. */
  rows: number;
  /** Number of product slots per row. */
  slotsPerRow: number;
  /** Material applied to the shelf frame. */
  material: MaterialConfig;
  /** Products placed on this shelf. */
  products: ProductPlacement[];
}

// ---------------------------------------------------------------------------
// Product Placement
// ---------------------------------------------------------------------------

/**
 * Describes where and how a product's 3-D model is placed on a shelf.
 */
export interface ProductPlacement {
  /** Reference to the product identifier. */
  productId: string;
  /** Local position on the shelf `[x, y, z]`. */
  position: Vector3Tuple;
  /** Euler rotation `[x, y, z]` in radians. */
  rotation: Vector3Tuple;
  /** Scale multiplier `[x, y, z]`. */
  scale: Vector3Tuple;
  /** Shelf row index (0-based). */
  row: number;
  /** Slot index within the row (0-based). */
  slot: number;
}

// ---------------------------------------------------------------------------
// Interaction
// ---------------------------------------------------------------------------

/**
 * Tracks the current user interaction state within the 3-D scene.
 */
export interface InteractionState {
  /** ID of the product whose mesh is currently hovered (`null` if none). */
  hoveredProductId: string | null;
  /** ID of the product that has been selected / clicked (`null` if none). */
  selectedProductId: string | null;
  /** Whether a camera or model animation is currently playing. */
  isAnimating: boolean;
  /** Whether the user is currently dragging to orbit the camera. */
  isDragging: boolean;
}

// ---------------------------------------------------------------------------
// Performance Settings
// ---------------------------------------------------------------------------

/**
 * Fine-grained rendering settings derived from the current `PerformanceLevel`.
 */
export interface PerformanceSettings {
  /** Overall quality tier. */
  level: PerformanceLevel;
  /** Whether real-time shadows are enabled. */
  shadows: boolean;
  /** Whether post-processing effects are enabled. */
  postProcessing: boolean;
  /** Whether anti-aliasing is enabled. */
  antialias: boolean;
  /** Device pixel ratio cap. */
  pixelRatio: number;
  /** Target frames per second. */
  targetFps: number;
  /** Maximum number of lights contributing to the scene. */
  maxLights: number;
}

// ---------------------------------------------------------------------------
// Scene (root config)
// ---------------------------------------------------------------------------

/**
 * Root configuration object that fully describes a 3-D grocery scene.
 */
export interface SceneConfig {
  /** Camera setup. */
  camera: CameraConfig;
  /** Array of light sources. */
  lights: LightConfig[];
  /** Shelf units with their product placements. */
  shelves: ShelfConfig[];
  /** Background colour of the scene (CSS string). */
  backgroundColor: string;
  /** Environment map URL for reflections (equirectangular HDR). */
  environmentMapUrl: string | null;
  /** Fog configuration. */
  fog: FogConfig | null;
  /** Performance / quality settings. */
  performance: PerformanceSettings;
}

// ---------------------------------------------------------------------------
// Fog
// ---------------------------------------------------------------------------

/**
 * Scene fog configuration.
 */
export interface FogConfig {
  /** Fog colour (CSS string). */
  color: string;
  /** Distance at which fog starts. */
  near: number;
  /** Distance at which fog is fully opaque. */
  far: number;
}

// ---------------------------------------------------------------------------
// Animation
// ---------------------------------------------------------------------------

/**
 * Describes a camera animation transition.
 */
export interface CameraAnimation {
  /** Starting camera position `[x, y, z]`. */
  fromPosition: Vector3Tuple;
  /** Ending camera position `[x, y, z]`. */
  toPosition: Vector3Tuple;
  /** Starting look-at target `[x, y, z]`. */
  fromTarget: Vector3Tuple;
  /** Ending look-at target `[x, y, z]`. */
  toTarget: Vector3Tuple;
  /** Duration in milliseconds. */
  duration: number;
  /** Easing function identifier. */
  easing: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
}
