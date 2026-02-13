import type { ReactNode } from 'react';

interface InteractionRaycasterProps {
  children: ReactNode;
}

/**
 * Wrapper component for raycasting interaction.
 * React Three Fiber handles raycasting natively via pointer events,
 * so this acts as a semantic grouping layer.
 */
export function InteractionRaycaster({ children }: InteractionRaycasterProps) {
  return <group>{children}</group>;
}
