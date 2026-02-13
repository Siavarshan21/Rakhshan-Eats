import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';
import { useSelectionStore } from '../store/selection.store';
import { ProductLabel } from './ProductLabel';

const HOVER_LIFT = 0.15;
const LERP_SPEED = 0.1;

interface ProductMeshProps {
  productId: string;
  productName: string;
  productPrice: number;
  position: [number, number, number];
  scale?: [number, number, number];
  color: string;
}

export function ProductMesh({
  productId,
  productName,
  productPrice,
  position,
  scale = [0.3, 0.4, 0.25],
  color,
}: ProductMeshProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const selectedProductId = useSelectionStore((s) => s.selectedProductId);
  const selectProduct = useSelectionStore((s) => s.selectProduct);
  const deselectProduct = useSelectionStore((s) => s.deselectProduct);
  const hoverProduct = useSelectionStore((s) => s.hoverProduct);
  const clearHover = useSelectionStore((s) => s.clearHover);

  const isSelected = selectedProductId === productId;
  const targetY = position[1] + (hovered ? HOVER_LIFT : 0);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * LERP_SPEED;
    const targetScale = hovered || isSelected ? 1.08 : 1;
    meshRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, LERP_SPEED);
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        position={position}
        scale={scale}
        castShadow
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          hoverProduct(productId);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          clearHover();
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (isSelected) {
            deselectProduct();
          } else {
            selectProduct(productId);
          }
        }}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={hovered || isSelected ? '#fbbf24' : color}
          roughness={0.5}
          metalness={0.1}
          emissive={isSelected ? '#fbbf24' : '#000000'}
          emissiveIntensity={isSelected ? 0.3 : 0}
        />
      </mesh>

      {hovered && (
        <ProductLabel
          name={productName}
          price={productPrice}
          position={[position[0], position[1] + 0.5, position[2]]}
        />
      )}
    </group>
  );
}
