import type { MeshStandardMaterialParameters } from 'three';

export const storeFloorConfig: MeshStandardMaterialParameters = {
  color: '#e8e8e8',
  roughness: 0.8,
  metalness: 0.2,
};

export const tileFloorConfig: MeshStandardMaterialParameters = {
  color: '#f0f0f0',
  roughness: 0.6,
  metalness: 0.15,
};

export const polishedFloorConfig: MeshStandardMaterialParameters = {
  color: '#d4d4d8',
  roughness: 0.3,
  metalness: 0.4,
};

export const concreteFloorConfig: MeshStandardMaterialParameters = {
  color: '#a1a1aa',
  roughness: 0.95,
  metalness: 0.05,
};
