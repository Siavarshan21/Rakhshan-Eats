import type { MeshStandardMaterialParameters } from 'three';

export const neonCyanConfig: MeshStandardMaterialParameters = {
  color: '#22d3ee',
  emissive: '#22d3ee',
  emissiveIntensity: 2.0,
  roughness: 0.1,
  metalness: 0.0,
  toneMapped: false,
};

export const neonPinkConfig: MeshStandardMaterialParameters = {
  color: '#f472b6',
  emissive: '#f472b6',
  emissiveIntensity: 2.0,
  roughness: 0.1,
  metalness: 0.0,
  toneMapped: false,
};

export const neonGreenConfig: MeshStandardMaterialParameters = {
  color: '#4ade80',
  emissive: '#4ade80',
  emissiveIntensity: 2.0,
  roughness: 0.1,
  metalness: 0.0,
  toneMapped: false,
};

export const neonAmberConfig: MeshStandardMaterialParameters = {
  color: '#fbbf24',
  emissive: '#fbbf24',
  emissiveIntensity: 2.0,
  roughness: 0.1,
  metalness: 0.0,
  toneMapped: false,
};

export const neonWhiteConfig: MeshStandardMaterialParameters = {
  color: '#f8fafc',
  emissive: '#f8fafc',
  emissiveIntensity: 1.5,
  roughness: 0.1,
  metalness: 0.0,
  toneMapped: false,
};

/**
 * Creates a neon material config with a custom color.
 */
export function createNeonMaterial(
  color: string,
  intensity = 2.0,
): MeshStandardMaterialParameters {
  return {
    color,
    emissive: color,
    emissiveIntensity: intensity,
    roughness: 0.1,
    metalness: 0.0,
    toneMapped: false,
  };
}
