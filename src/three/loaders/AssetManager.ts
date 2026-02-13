import { preloadGLTFBatch } from './useGLTFLoader';
import { preloadTextureBatch } from './useTextureLoader';

interface AssetManifest {
  models: string[];
  textures: string[];
}

/**
 * Central asset preloading manager.
 * Call `AssetManager.preloadAll()` early in the app lifecycle to warm caches.
 */
export class AssetManager {
  private static manifest: AssetManifest = {
    models: [],
    textures: [],
  };

  private static _isPreloaded = false;

  /**
   * Register model URLs to be preloaded.
   */
  static registerModels(urls: string[]): void {
    AssetManager.manifest.models.push(...urls);
  }

  /**
   * Register texture URLs to be preloaded.
   */
  static registerTextures(urls: string[]): void {
    AssetManager.manifest.textures.push(...urls);
  }

  /**
   * Get the full manifest of registered assets.
   */
  static getManifest(): Readonly<AssetManifest> {
    return { ...AssetManager.manifest };
  }

  /**
   * Preload all registered models and textures.
   * Safe to call multiple times; only preloads once.
   */
  static preloadAll(): void {
    if (AssetManager._isPreloaded) return;

    const uniqueModels = [...new Set(AssetManager.manifest.models)];
    const uniqueTextures = [...new Set(AssetManager.manifest.textures)];

    if (uniqueModels.length > 0) {
      preloadGLTFBatch(uniqueModels);
    }
    if (uniqueTextures.length > 0) {
      preloadTextureBatch(uniqueTextures);
    }

    AssetManager._isPreloaded = true;
  }

  /**
   * Reset the manager state. Useful for testing.
   */
  static reset(): void {
    AssetManager.manifest = { models: [], textures: [] };
    AssetManager._isPreloaded = false;
  }

  /**
   * Get the total count of registered assets.
   */
  static getTotalAssetCount(): number {
    return AssetManager.manifest.models.length + AssetManager.manifest.textures.length;
  }
}
