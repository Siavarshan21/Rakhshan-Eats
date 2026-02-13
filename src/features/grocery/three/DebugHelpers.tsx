import { Grid } from '@react-three/drei';

export function DebugHelpers() {
  if (import.meta.env.PROD) return null;

  return (
    <>
      <axesHelper args={[5]} />
      <Grid
        position={[0, 0.01, 0]}
        args={[30, 30]}
        cellSize={1}
        cellColor="#e2e8f0"
        sectionSize={5}
        sectionColor="#94a3b8"
        fadeDistance={30}
        infiniteGrid
      />
    </>
  );
}
