import { useTexture } from '@react-three/drei';
import { RepeatWrapping, NearestFilter, LinearFilter, SRGBColorSpace } from 'three';
import type { Texture } from 'three';

interface TextureLoadResult {
  texture: Texture | null;
  isLoaded: boolean;
  error: unknown;
}

/**
 * Custom hook wrapping Drei's useTexture with error handling.
 */
export function useTextureLoader(url: string): TextureLoadResult {
  try {
    const texture = useTexture(url);
    return { texture: texture as Texture, isLoaded: true, error: null };
  } catch (error) {
    return { texture: null, isLoaded: false, error };
  }
}

interface TiledTextureOptions {
  repeatX?: number;
  repeatY?: number;
  filtering?: 'nearest' | 'linear';
}

/**
 * Load a texture configured for tiling (e.g., floor tiles).
 */
export function useTiledTexture(
  url: string,
  options: TiledTextureOptions = {},
): TextureLoadResult {
  const { repeatX = 4, repeatY = 4, filtering = 'linear' } = options;

  try {
    const texture = useTexture(url) as Texture;

    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
    texture.minFilter = filtering === 'nearest' ? NearestFilter : LinearFilter;
    texture.magFilter = filtering === 'nearest' ? NearestFilter : LinearFilter;
    texture.colorSpace = SRGBColorSpace;

    return { texture, isLoaded: true, error: null };
  } catch (error) {
    return { texture: null, isLoaded: false, error };
  }
}

/**
 * Preload a texture so it is ready when the component mounts.
 */
export function preloadTexture(url: string): void {
  useTexture.preload(url);
}

/**
 * Preload multiple textures.
 */
export function preloadTextureBatch(urls: string[]): void {
  urls.forEach((url) => useTexture.preload(url));
}
