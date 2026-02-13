import * as THREE from 'three';

/**
 * Simple LOD (Level of Detail) helper.
 * Returns the appropriate detail level index based on distance from camera.
 */
export function getLODLevel(
  objectPosition: THREE.Vector3,
  cameraPosition: THREE.Vector3,
  thresholds: number[],
): number {
  const distance = objectPosition.distanceTo(cameraPosition);

  for (let i = 0; i < thresholds.length; i++) {
    if (distance < thresholds[i]!) {
      return i;
    }
  }

  return thresholds.length;
}

/**
 * Default LOD thresholds: [close, medium, far].
 * Returns index 0 = high detail, 1 = medium, 2 = low, 3 = culled.
 */
export const DEFAULT_LOD_THRESHOLDS = [10, 25, 50];

/**
 * Check if an object is within the camera's view frustum.
 */
export function isInFrustum(
  object: THREE.Object3D,
  camera: THREE.Camera,
  frustum?: THREE.Frustum,
): boolean {
  const frust = frustum ?? new THREE.Frustum();
  if (!frustum) {
    const projScreenMatrix = new THREE.Matrix4();
    projScreenMatrix.multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse,
    );
    frust.setFromProjectionMatrix(projScreenMatrix);
  }

  if (object instanceof THREE.Mesh && object.geometry.boundingSphere) {
    const sphere = object.geometry.boundingSphere.clone();
    sphere.applyMatrix4(object.matrixWorld);
    return frust.intersectsSphere(sphere);
  }

  const box = new THREE.Box3().setFromObject(object);
  return frust.intersectsBox(box);
}

/**
 * Create a reusable frustum from the camera for batch checks.
 */
export function createFrustumFromCamera(camera: THREE.Camera): THREE.Frustum {
  const projScreenMatrix = new THREE.Matrix4();
  projScreenMatrix.multiplyMatrices(
    camera.projectionMatrix,
    camera.matrixWorldInverse,
  );
  const frustum = new THREE.Frustum();
  frustum.setFromProjectionMatrix(projScreenMatrix);
  return frustum;
}

/**
 * FPS monitor for runtime performance tracking.
 */
export class FPSMonitor {
  private frames = 0;
  private lastTime = performance.now();
  private _fps = 0;
  private _frameTime = 0;
  private history: number[] = [];
  private maxHistory: number;

  constructor(maxHistory = 60) {
    this.maxHistory = maxHistory;
  }

  /**
   * Call once per frame to update the FPS counter.
   */
  tick(): void {
    this.frames++;
    const now = performance.now();
    const delta = now - this.lastTime;

    if (delta >= 1000) {
      this._fps = (this.frames * 1000) / delta;
      this._frameTime = delta / this.frames;
      this.history.push(this._fps);

      if (this.history.length > this.maxHistory) {
        this.history.shift();
      }

      this.frames = 0;
      this.lastTime = now;
    }
  }

  /** Current FPS. */
  get fps(): number {
    return Math.round(this._fps);
  }

  /** Average frame time in ms. */
  get frameTime(): number {
    return this._frameTime;
  }

  /** Average FPS over the history window. */
  get averageFps(): number {
    if (this.history.length === 0) return 0;
    const sum = this.history.reduce((a, b) => a + b, 0);
    return Math.round(sum / this.history.length);
  }

  /** Minimum FPS in the history window. */
  get minFps(): number {
    if (this.history.length === 0) return 0;
    return Math.round(Math.min(...this.history));
  }

  /** Reset the monitor. */
  reset(): void {
    this.frames = 0;
    this.lastTime = performance.now();
    this._fps = 0;
    this._frameTime = 0;
    this.history = [];
  }
}
