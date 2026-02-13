import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { CameraConfig } from '../types';

interface CameraRigProps {
  target: CameraConfig;
  lerpSpeed?: number;
  enabled?: boolean;
}

const DEFAULT_LERP_SPEED = 0.03;

const _targetPosition = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3();

export function CameraRig({
  target,
  lerpSpeed = DEFAULT_LERP_SPEED,
  enabled = true,
}: CameraRigProps) {
  const { camera } = useThree();
  const lookAtRef = useRef(new THREE.Vector3(target.target[0], target.target[1], target.target[2]));

  useFrame(() => {
    if (!enabled) return;

    _targetPosition.set(target.position[0], target.position[1], target.position[2]);
    _targetLookAt.set(target.target[0], target.target[1], target.target[2]);

    camera.position.lerp(_targetPosition, lerpSpeed);

    lookAtRef.current.lerp(_targetLookAt, lerpSpeed);
    camera.lookAt(lookAtRef.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      const currentFov = camera.fov;
      const fovDiff = target.fov - currentFov;
      if (Math.abs(fovDiff) > 0.01) {
        camera.fov += fovDiff * lerpSpeed;
        camera.updateProjectionMatrix();
      }
    }
  });

  return null;
}
