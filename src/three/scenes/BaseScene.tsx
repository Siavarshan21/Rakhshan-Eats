import type { ReactNode } from 'react';
import { Floor } from '../objects/Floor';
import { Lights } from '../canvas/Lights';

interface BaseSceneProps {
  children: ReactNode;
}

export function BaseScene({ children }: BaseSceneProps) {
  return (
    <>
      <Lights />
      <Floor />
      <fog attach="fog" args={['#f8fafc', 20, 60]} />
      {children}
    </>
  );
}
