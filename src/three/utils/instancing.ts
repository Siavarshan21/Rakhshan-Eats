import * as THREE from 'three';

interface InstanceData {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  color?: string;
}

const _matrix = new THREE.Matrix4();
const _position = new THREE.Vector3();
const _quaternion = new THREE.Quaternion();
const _scale = new THREE.Vector3();
const _euler = new THREE.Euler();
const _color = new THREE.Color();

/**
 * Create an InstancedMesh from a geometry and material,
 * populated with the given instance data.
 */
export function createInstancedMesh(
  geometry: THREE.BufferGeometry,
  material: THREE.Material,
  instances: InstanceData[],
): THREE.InstancedMesh {
  const mesh = new THREE.InstancedMesh(geometry, material, instances.length);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  const hasColors = instances.some((inst) => inst.color);

  instances.forEach((inst, i) => {
    _position.set(inst.position[0], inst.position[1], inst.position[2]);

    if (inst.rotation) {
      _euler.set(inst.rotation[0], inst.rotation[1], inst.rotation[2]);
      _quaternion.setFromEuler(_euler);
    } else {
      _quaternion.identity();
    }

    if (inst.scale) {
      _scale.set(inst.scale[0], inst.scale[1], inst.scale[2]);
    } else {
      _scale.set(1, 1, 1);
    }

    _matrix.compose(_position, _quaternion, _scale);
    mesh.setMatrixAt(i, _matrix);

    if (hasColors && inst.color) {
      _color.set(inst.color);
      mesh.setColorAt(i, _color);
    }
  });

  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) {
    mesh.instanceColor.needsUpdate = true;
  }

  return mesh;
}

/**
 * Update a single instance's transform within an InstancedMesh.
 */
export function updateInstance(
  mesh: THREE.InstancedMesh,
  index: number,
  data: Partial<InstanceData>,
): void {
  mesh.getMatrixAt(index, _matrix);
  _matrix.decompose(_position, _quaternion, _scale);

  if (data.position) {
    _position.set(data.position[0], data.position[1], data.position[2]);
  }
  if (data.rotation) {
    _euler.set(data.rotation[0], data.rotation[1], data.rotation[2]);
    _quaternion.setFromEuler(_euler);
  }
  if (data.scale) {
    _scale.set(data.scale[0], data.scale[1], data.scale[2]);
  }

  _matrix.compose(_position, _quaternion, _scale);
  mesh.setMatrixAt(index, _matrix);
  mesh.instanceMatrix.needsUpdate = true;

  if (data.color) {
    _color.set(data.color);
    mesh.setColorAt(index, _color);
    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }
  }
}

/**
 * Generate a grid of instance data for testing or layout.
 */
export function generateGrid(
  rows: number,
  cols: number,
  spacingX: number,
  spacingZ: number,
  yPosition = 0,
): InstanceData[] {
  const instances: InstanceData[] = [];
  const offsetX = ((cols - 1) * spacingX) / 2;
  const offsetZ = ((rows - 1) * spacingZ) / 2;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      instances.push({
        position: [
          col * spacingX - offsetX,
          yPosition,
          row * spacingZ - offsetZ,
        ],
      });
    }
  }

  return instances;
}
