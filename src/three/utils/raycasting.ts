import * as THREE from 'three';

const _raycaster = new THREE.Raycaster();
const _pointer = new THREE.Vector2();

/**
 * Perform a raycast from a mouse/pointer event against a list of objects.
 * Returns the closest intersection or null.
 */
export function raycastFromPointer(
  event: { clientX: number; clientY: number },
  camera: THREE.Camera,
  objects: THREE.Object3D[],
  domElement: HTMLElement,
): THREE.Intersection | null {
  const rect = domElement.getBoundingClientRect();
  _pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  _pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  _raycaster.setFromCamera(_pointer, camera);
  const intersections = _raycaster.intersectObjects(objects, true);

  return intersections.length > 0 ? intersections[0]! : null;
}

/**
 * Perform a raycast from a mouse/pointer event against all scene children.
 * Returns all intersections sorted by distance (closest first).
 */
export function raycastScene(
  event: { clientX: number; clientY: number },
  camera: THREE.Camera,
  scene: THREE.Scene,
  domElement: HTMLElement,
  recursive = true,
): THREE.Intersection[] {
  const rect = domElement.getBoundingClientRect();
  _pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  _pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  _raycaster.setFromCamera(_pointer, camera);
  return _raycaster.intersectObjects(scene.children, recursive);
}

/**
 * Perform a raycast from NDC coordinates.
 * Useful when the pointer position is already normalized.
 */
export function raycastFromNDC(
  ndcX: number,
  ndcY: number,
  camera: THREE.Camera,
  objects: THREE.Object3D[],
  recursive = true,
): THREE.Intersection[] {
  _pointer.set(ndcX, ndcY);
  _raycaster.setFromCamera(_pointer, camera);
  return _raycaster.intersectObjects(objects, recursive);
}

/**
 * Find the product ID from a raycast intersection.
 * Walks up the object hierarchy looking for userData.productId.
 */
export function findProductId(intersection: THREE.Intersection): string | null {
  let current: THREE.Object3D | null = intersection.object;
  while (current) {
    if (current.userData?.productId) {
      return current.userData.productId as string;
    }
    current = current.parent;
  }
  return null;
}

/**
 * Check whether an object is within a specified distance from the camera.
 */
export function isWithinRange(
  object: THREE.Object3D,
  camera: THREE.Camera,
  maxDistance: number,
): boolean {
  const objectWorldPos = new THREE.Vector3();
  object.getWorldPosition(objectWorldPos);
  return camera.position.distanceTo(objectWorldPos) <= maxDistance;
}
