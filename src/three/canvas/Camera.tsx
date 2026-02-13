import { useRef, useEffect } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import type { CameraConfig } from '../types';
import { DEFAULT_CAMERA } from '../config/camera.config';

interface CameraProps {
  config?: CameraConfig;
  makeDefault?: boolean;
}

export function Camera({ config = DEFAULT_CAMERA, makeDefault = true }: CameraProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useEffect(() => {
    if (!cameraRef.current) return;
    cameraRef.current.lookAt(
      config.target[0],
      config.target[1],
      config.target[2],
    );
  }, [config.target]);

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault={makeDefault}
      position={config.position}
      fov={config.fov}
      near={config.near}
      far={config.far}
    />
  );
}
