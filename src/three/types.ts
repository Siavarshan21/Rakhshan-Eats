import type { Vector3Tuple } from 'three';

export interface SceneConfig {
  camera: CameraConfig;
  lights: LightConfig[];
  fog?: FogConfig;
  background: string;
}

export interface CameraConfig {
  position: Vector3Tuple;
  target: Vector3Tuple;
  fov: number;
  near: number;
  far: number;
}

export interface LightConfig {
  type: 'ambient' | 'directional' | 'point' | 'spot';
  position?: Vector3Tuple;
  color: string;
  intensity: number;
  castShadow?: boolean;
}

export interface FogConfig {
  color: string;
  near: number;
  far: number;
}

export type PerformanceLevel = 'low' | 'medium' | 'high';

export interface PerformanceConfig {
  level: PerformanceLevel;
  maxInstances: number;
  enableShadows: boolean;
  enablePostProcessing: boolean;
  pixelRatio: number;
  antialias: boolean;
}

export interface InteractionState {
  hoveredId: string | null;
  selectedId: string | null;
  isAnimating: boolean;
  isDragging: boolean;
}

export interface ShelfLayoutConfig {
  width: number;
  height: number;
  depth: number;
  shelfSpacing: number;
  tierCount: number;
  productSpacing: number;
}

export interface ProductPlacementConfig {
  productId: string;
  shelfIndex: number;
  tierIndex: number;
  positionOnTier: number;
  scale: number;
}
