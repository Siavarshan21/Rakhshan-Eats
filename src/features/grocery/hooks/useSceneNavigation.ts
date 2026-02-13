import { useCallback, useRef } from 'react';
import { useThree } from '@react-three/fiber';
interface CategoryPosition {
  slug: string;
  position: [number, number, number];
}

const CATEGORY_POSITIONS: CategoryPosition[] = [
  { slug: 'fruits-vegetables', position: [-10, 3, -6] },
  { slug: 'dairy-eggs', position: [-4, 3, -6] },
  { slug: 'bakery', position: [2, 3, -6] },
  { slug: 'meat-seafood', position: [8, 3, -6] },
  { slug: 'beverages', position: [-10, 3, 2] },
  { slug: 'snacks', position: [-4, 3, 2] },
  { slug: 'frozen-foods', position: [2, 3, 2] },
  { slug: 'pantry-staples', position: [8, 3, 2] },
];

const ANIMATION_DURATION = 1000;

export function useSceneNavigation() {
  const { camera } = useThree();
  const animationRef = useRef<number | null>(null);

  const navigateToCategory = useCallback(
    (categorySlug: string) => {
      const target = CATEGORY_POSITIONS.find(
        (cp) => cp.slug === categorySlug,
      );
      if (!target) return;

      const startPosition = {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z,
      };
      const endPosition = {
        x: target.position[0],
        y: target.position[1],
        z: target.position[2] + 6,
      };

      const startTime = performance.now();

      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        camera.position.set(
          startPosition.x + (endPosition.x - startPosition.x) * eased,
          startPosition.y + (endPosition.y - startPosition.y) * eased,
          startPosition.z + (endPosition.z - startPosition.z) * eased,
        );

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          animationRef.current = null;
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    },
    [camera],
  );

  const resetCamera = useCallback(() => {
    const startPosition = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
    };
    const defaultPosition = { x: 0, y: 8, z: 18 };
    const startTime = performance.now();

    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      camera.position.set(
        startPosition.x + (defaultPosition.x - startPosition.x) * eased,
        startPosition.y + (defaultPosition.y - startPosition.y) * eased,
        startPosition.z + (defaultPosition.z - startPosition.z) * eased,
      );

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [camera]);

  return {
    navigateToCategory,
    resetCamera,
    categoryPositions: CATEGORY_POSITIONS,
  };
}
