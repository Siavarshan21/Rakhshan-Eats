import { useGLTF } from '@react-three/drei';
import type { GLTF } from 'three-stdlib';

interface GLTFLoadResult {
  scene: GLTF['scene'] | null;
  isLoaded: boolean;
  error: unknown;
}

/**
 * Custom hook wrapping Drei's useGLTF with error handling and fallback.
 * Returns the scene, a loading flag, and any error that occurred.
 */
export function useGLTFModel(url: string): GLTFLoadResult {
  try {
    const result = useGLTF(url);
    return { scene: result.scene, isLoaded: true, error: null };
  } catch (error) {
    return { scene: null, isLoaded: false, error };
  }
}

/**
 * Preload a GLTF model so it is ready when the component mounts.
 */
export function preloadGLTF(url: string): void {
  useGLTF.preload(url);
}

/**
 * Preload multiple GLTF models.
 */
export function preloadGLTFBatch(urls: string[]): void {
  urls.forEach((url) => useGLTF.preload(url));
}
