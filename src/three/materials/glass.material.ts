import type { MeshPhysicalMaterialParameters } from 'three';

export const glassMaterialConfig: MeshPhysicalMaterialParameters = {
  color: '#ffffff',
  metalness: 0,
  roughness: 0,
  transmission: 0.9,
  transparent: true,
  opacity: 0.3,
  ior: 1.5,
};

export const frostedGlassMaterialConfig: MeshPhysicalMaterialParameters = {
  color: '#f0f0f0',
  metalness: 0,
  roughness: 0.4,
  transmission: 0.6,
  transparent: true,
  opacity: 0.5,
  ior: 1.3,
};

export const tintedGlassMaterialConfig: MeshPhysicalMaterialParameters = {
  color: '#e0f2fe',
  metalness: 0,
  roughness: 0.05,
  transmission: 0.85,
  transparent: true,
  opacity: 0.35,
  ior: 1.5,
};
