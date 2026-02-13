import type { Vector3Tuple } from 'three';

interface BoundingBox {
  min: Vector3Tuple;
  max: Vector3Tuple;
}

export function checkAABBCollision(a: BoundingBox, b: BoundingBox): boolean {
  return (
    a.min[0] <= b.max[0] && a.max[0] >= b.min[0] &&
    a.min[1] <= b.max[1] && a.max[1] >= b.min[1] &&
    a.min[2] <= b.max[2] && a.max[2] >= b.min[2]
  );
}

export function pointInBox(point: Vector3Tuple, box: BoundingBox): boolean {
  return (
    point[0] >= box.min[0] && point[0] <= box.max[0] &&
    point[1] >= box.min[1] && point[1] <= box.max[1] &&
    point[2] >= box.min[2] && point[2] <= box.max[2]
  );
}
