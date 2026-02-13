import type { ReactNode } from 'react';
import { BaseScene } from './BaseScene';
import { Wall } from '../objects/Wall';
import { Ceiling } from '../objects/Ceiling';
import { Pillar } from '../objects/Pillar';

const STORE_WIDTH = 30;
const STORE_DEPTH = 25;
const WALL_HEIGHT = 5;
const PILLAR_POSITIONS: [number, number, number][] = [
  [-10, 0, -8],
  [10, 0, -8],
  [-10, 0, 4],
  [10, 0, 4],
];

interface GroceryStoreSceneProps {
  children: ReactNode;
}

export function GroceryStoreScene({ children }: GroceryStoreSceneProps) {
  return (
    <BaseScene>
      {/* Back wall */}
      <Wall position={[0, WALL_HEIGHT / 2, -STORE_DEPTH / 2]} width={STORE_WIDTH} height={WALL_HEIGHT} color="#f1f5f9" />
      {/* Left wall */}
      <Wall position={[-STORE_WIDTH / 2, WALL_HEIGHT / 2, 0]} rotation={[0, Math.PI / 2, 0]} width={STORE_DEPTH} height={WALL_HEIGHT} color="#f1f5f9" />
      {/* Right wall */}
      <Wall position={[STORE_WIDTH / 2, WALL_HEIGHT / 2, 0]} rotation={[0, Math.PI / 2, 0]} width={STORE_DEPTH} height={WALL_HEIGHT} color="#f1f5f9" />
      {/* Ceiling */}
      <Ceiling size={STORE_WIDTH} height={WALL_HEIGHT} />
      {/* Pillars */}
      {PILLAR_POSITIONS.map((pos, i) => (
        <Pillar key={i} position={pos} height={WALL_HEIGHT} />
      ))}
      {children}
    </BaseScene>
  );
}
