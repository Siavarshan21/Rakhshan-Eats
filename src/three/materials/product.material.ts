import type { MeshStandardMaterialParameters } from 'three';

export const productDefaultConfig: MeshStandardMaterialParameters = {
  color: '#94a3b8',
  roughness: 0.6,
  metalness: 0.1,
};

export const productPlasticConfig: MeshStandardMaterialParameters = {
  color: '#ffffff',
  roughness: 0.5,
  metalness: 0.0,
};

export const productCardboardConfig: MeshStandardMaterialParameters = {
  color: '#d4a574',
  roughness: 0.9,
  metalness: 0.0,
};

export const productCanConfig: MeshStandardMaterialParameters = {
  color: '#a1a1aa',
  roughness: 0.2,
  metalness: 0.9,
};

export const productGlassConfig: MeshStandardMaterialParameters = {
  color: '#e2e8f0',
  roughness: 0.1,
  metalness: 0.1,
  transparent: true,
  opacity: 0.7,
};

export const productFreshConfig: MeshStandardMaterialParameters = {
  color: '#86efac',
  roughness: 0.7,
  metalness: 0.0,
};

/**
 * Returns a material config based on the product packaging type.
 */
export function getProductMaterial(
  packagingType: 'default' | 'plastic' | 'cardboard' | 'can' | 'glass' | 'fresh',
): MeshStandardMaterialParameters {
  switch (packagingType) {
    case 'plastic':
      return productPlasticConfig;
    case 'cardboard':
      return productCardboardConfig;
    case 'can':
      return productCanConfig;
    case 'glass':
      return productGlassConfig;
    case 'fresh':
      return productFreshConfig;
    default:
      return productDefaultConfig;
  }
}
