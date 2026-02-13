import type { MeshStandardMaterialParameters, MeshPhysicalMaterialParameters } from 'three';

export const SHELF_METAL_MATERIAL: MeshStandardMaterialParameters = {
  color: '#b0b0b0',
  roughness: 0.3,
  metalness: 0.8,
};

export const SHELF_WOOD_MATERIAL: MeshStandardMaterialParameters = {
  color: '#8b6f47',
  roughness: 0.7,
  metalness: 0.05,
};

export const FLOOR_MATERIAL: MeshStandardMaterialParameters = {
  color: '#e8e8e8',
  roughness: 0.8,
  metalness: 0.2,
};

export const WALL_MATERIAL: MeshStandardMaterialParameters = {
  color: '#f5f5f0',
  roughness: 0.9,
  metalness: 0.0,
};

export const CEILING_MATERIAL: MeshStandardMaterialParameters = {
  color: '#ffffff',
  roughness: 1.0,
  metalness: 0.0,
};

export const GLASS_MATERIAL: MeshPhysicalMaterialParameters = {
  color: '#ffffff',
  metalness: 0,
  roughness: 0,
  transmission: 0.9,
  transparent: true,
  opacity: 0.3,
  ior: 1.5,
};

export const PRODUCT_DEFAULT_MATERIAL: MeshStandardMaterialParameters = {
  color: '#94a3b8',
  roughness: 0.6,
  metalness: 0.1,
};

export const PILLAR_MATERIAL: MeshStandardMaterialParameters = {
  color: '#d4d4d8',
  roughness: 0.5,
  metalness: 0.3,
};

export const NEON_MATERIAL: MeshStandardMaterialParameters = {
  color: '#22d3ee',
  emissive: '#22d3ee',
  emissiveIntensity: 2.0,
  roughness: 0.1,
  metalness: 0.0,
};
