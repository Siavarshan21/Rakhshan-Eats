import * as THREE from 'three';

const _vector3 = new THREE.Vector3();
const _ndcVector = new THREE.Vector3();

/**
 * Convert a 3D world position to 2D screen coordinates (pixels).
 * Returns { x, y, isVisible } where isVisible indicates
 * whether the point is in front of the camera.
 */
export function worldToScreen(
  worldPosition: [number, number, number],
  camera: THREE.Camera,
  canvasWidth: number,
  canvasHeight: number,
): { x: number; y: number; isVisible: boolean } {
  _vector3.set(worldPosition[0], worldPosition[1], worldPosition[2]);
  _vector3.project(camera);

  const isVisible = _vector3.z < 1;

  const x = ((_vector3.x + 1) / 2) * canvasWidth;
  const y = ((-_vector3.y + 1) / 2) * canvasHeight;

  return { x, y, isVisible };
}

/**
 * Convert 2D screen coordinates (pixels) to a 3D world position
 * projected onto a plane at the given depth (z in NDC).
 */
export function screenToWorld(
  screenX: number,
  screenY: number,
  camera: THREE.Camera,
  canvasWidth: number,
  canvasHeight: number,
  targetZ = 0.5,
): [number, number, number] {
  _ndcVector.set(
    (screenX / canvasWidth) * 2 - 1,
    -(screenY / canvasHeight) * 2 + 1,
    targetZ,
  );

  _ndcVector.unproject(camera);

  return [_ndcVector.x, _ndcVector.y, _ndcVector.z];
}

/**
 * Convert screen coordinates to a ray direction from the camera.
 * Useful for raycasting from mouse position.
 */
export function screenToRay(
  screenX: number,
  screenY: number,
  camera: THREE.Camera,
  canvasWidth: number,
  canvasHeight: number,
): THREE.Ray {
  const ndcX = (screenX / canvasWidth) * 2 - 1;
  const ndcY = -(screenY / canvasHeight) * 2 + 1;

  const near = new THREE.Vector3(ndcX, ndcY, 0).unproject(camera);
  const far = new THREE.Vector3(ndcX, ndcY, 1).unproject(camera);

  const direction = far.sub(near).normalize();
  return new THREE.Ray(near, direction);
}

/**
 * Project a 3D position onto a ground plane (y=0)
 * from the camera's perspective.
 */
export function projectToGround(
  screenX: number,
  screenY: number,
  camera: THREE.Camera,
  canvasWidth: number,
  canvasHeight: number,
): [number, number, number] | null {
  const ray = screenToRay(screenX, screenY, camera, canvasWidth, canvasHeight);
  const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const intersection = new THREE.Vector3();

  const hit = ray.intersectPlane(groundPlane, intersection);
  if (!hit) return null;

  return [intersection.x, intersection.y, intersection.z];
}
