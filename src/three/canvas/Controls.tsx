import { OrbitControls } from '@react-three/drei';

interface ControlsProps {
  enabled?: boolean;
  enableZoom?: boolean;
  enablePan?: boolean;
  enableRotate?: boolean;
  minDistance?: number;
  maxDistance?: number;
  minPolarAngle?: number;
  maxPolarAngle?: number;
  dampingFactor?: number;
  target?: [number, number, number];
}

const DEFAULT_MIN_DISTANCE = 3;
const DEFAULT_MAX_DISTANCE = 40;
const DEFAULT_MIN_POLAR_ANGLE = 0.2;
const DEFAULT_MAX_POLAR_ANGLE = Math.PI / 2 - 0.05;
const DEFAULT_DAMPING_FACTOR = 0.08;

export function Controls({
  enabled = true,
  enableZoom = true,
  enablePan = true,
  enableRotate = true,
  minDistance = DEFAULT_MIN_DISTANCE,
  maxDistance = DEFAULT_MAX_DISTANCE,
  minPolarAngle = DEFAULT_MIN_POLAR_ANGLE,
  maxPolarAngle = DEFAULT_MAX_POLAR_ANGLE,
  dampingFactor = DEFAULT_DAMPING_FACTOR,
  target = [0, 2, 0],
}: ControlsProps) {
  return (
    <OrbitControls
      enabled={enabled}
      enableZoom={enableZoom}
      enablePan={enablePan}
      enableRotate={enableRotate}
      minDistance={minDistance}
      maxDistance={maxDistance}
      minPolarAngle={minPolarAngle}
      maxPolarAngle={maxPolarAngle}
      enableDamping
      dampingFactor={dampingFactor}
      target={target}
      makeDefault
    />
  );
}
