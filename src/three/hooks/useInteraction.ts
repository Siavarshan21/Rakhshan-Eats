import { useState, useCallback, useRef } from 'react';
import type { ThreeEvent } from '@react-three/fiber';

interface InteractionHandlers {
  onPointerOver: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut: (e: ThreeEvent<PointerEvent>) => void;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
}

interface InteractionState {
  isHovered: boolean;
  isSelected: boolean;
}

export function useInteraction(
  onSelect?: (id: string) => void,
  id: string = '',
): [InteractionState, InteractionHandlers] {
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const hoveredRef = useRef(false);

  const onPointerOver = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsHovered(true);
    hoveredRef.current = true;
    document.body.style.cursor = 'pointer';
  }, []);

  const onPointerOut = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsHovered(false);
    hoveredRef.current = false;
    document.body.style.cursor = 'auto';
  }, []);

  const onClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      setIsSelected((prev) => !prev);
      onSelect?.(id);
    },
    [onSelect, id],
  );

  return [
    { isHovered, isSelected },
    { onPointerOver, onPointerOut, onClick },
  ];
}
