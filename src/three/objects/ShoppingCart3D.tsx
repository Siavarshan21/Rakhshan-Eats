import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ShoppingCart3DProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  color?: string;
  animated?: boolean;
}

const CART_COLOR = '#71717a';
const WHEEL_COLOR = '#3f3f46';
const HANDLE_COLOR = '#52525b';
const WHEEL_RADIUS = 0.08;
const WHEEL_SEGMENTS = 12;

export function ShoppingCart3D({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  color = CART_COLOR,
  animated = false,
}: ShoppingCart3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!animated || !wheelsRef.current) return;
    wheelsRef.current.children.forEach((wheel) => {
      wheel.rotation.x += delta * 3;
    });
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Cart basket */}
      <group position={[0, 0.45, 0]}>
        {/* Bottom */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.6, 0.03, 0.4]} />
          <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Front wall */}
        <mesh position={[0, 0.15, 0.195]} castShadow>
          <boxGeometry args={[0.6, 0.3, 0.02]} />
          <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Back wall */}
        <mesh position={[0, 0.15, -0.195]} castShadow>
          <boxGeometry args={[0.6, 0.3, 0.02]} />
          <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Left wall */}
        <mesh position={[-0.295, 0.15, 0]} castShadow>
          <boxGeometry args={[0.02, 0.3, 0.4]} />
          <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Right wall */}
        <mesh position={[0.295, 0.15, 0]} castShadow>
          <boxGeometry args={[0.02, 0.3, 0.4]} />
          <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
        </mesh>
      </group>

      {/* Handle */}
      <group>
        {/* Left handle post */}
        <mesh position={[-0.25, 0.65, -0.22]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.35, 8]} />
          <meshStandardMaterial color={HANDLE_COLOR} metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Right handle post */}
        <mesh position={[0.25, 0.65, -0.22]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.35, 8]} />
          <meshStandardMaterial color={HANDLE_COLOR} metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Handle bar */}
        <mesh position={[0, 0.83, -0.22]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
          <meshStandardMaterial color={HANDLE_COLOR} metalness={0.6} roughness={0.4} />
        </mesh>
      </group>

      {/* Wheels */}
      <group ref={wheelsRef}>
        {/* Front-left */}
        <mesh position={[-0.22, WHEEL_RADIUS, 0.15]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[WHEEL_RADIUS, WHEEL_RADIUS, 0.03, WHEEL_SEGMENTS]} />
          <meshStandardMaterial color={WHEEL_COLOR} metalness={0.5} roughness={0.5} />
        </mesh>
        {/* Front-right */}
        <mesh position={[0.22, WHEEL_RADIUS, 0.15]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[WHEEL_RADIUS, WHEEL_RADIUS, 0.03, WHEEL_SEGMENTS]} />
          <meshStandardMaterial color={WHEEL_COLOR} metalness={0.5} roughness={0.5} />
        </mesh>
        {/* Back-left */}
        <mesh position={[-0.22, WHEEL_RADIUS, -0.15]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[WHEEL_RADIUS, WHEEL_RADIUS, 0.03, WHEEL_SEGMENTS]} />
          <meshStandardMaterial color={WHEEL_COLOR} metalness={0.5} roughness={0.5} />
        </mesh>
        {/* Back-right */}
        <mesh position={[0.22, WHEEL_RADIUS, -0.15]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[WHEEL_RADIUS, WHEEL_RADIUS, 0.03, WHEEL_SEGMENTS]} />
          <meshStandardMaterial color={WHEEL_COLOR} metalness={0.5} roughness={0.5} />
        </mesh>
      </group>

      {/* Axles */}
      <mesh position={[0, WHEEL_RADIUS, 0.15]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.5, 6]} />
        <meshStandardMaterial color={WHEEL_COLOR} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, WHEEL_RADIUS, -0.15]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.5, 6]} />
        <meshStandardMaterial color={WHEEL_COLOR} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}
