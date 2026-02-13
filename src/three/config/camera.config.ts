import type { CameraConfig } from '../types';

export const DEFAULT_CAMERA: CameraConfig = {
  position: [0, 8, 15],
  target: [0, 2, 0],
  fov: 60,
  near: 0.1,
  far: 1000,
};

export const AISLE_CAMERA: CameraConfig = {
  position: [0, 5, 8],
  target: [0, 2, 0],
  fov: 55,
  near: 0.1,
  far: 500,
};

export const PRODUCT_FOCUS_CAMERA: CameraConfig = {
  position: [0, 3, 4],
  target: [0, 2, 0],
  fov: 45,
  near: 0.1,
  far: 100,
};

export const OVERVIEW_CAMERA: CameraConfig = {
  position: [0, 20, 25],
  target: [0, 0, 0],
  fov: 65,
  near: 0.1,
  far: 1000,
};
