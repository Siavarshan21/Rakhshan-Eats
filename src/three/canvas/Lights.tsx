import { SCENE_LIGHTS } from '../config/lights.config';
import type { LightConfig } from '../types';

function SceneLight({ config }: { config: LightConfig }) {
  switch (config.type) {
    case 'ambient':
      return <ambientLight color={config.color} intensity={config.intensity} />;
    case 'directional':
      return (
        <directionalLight
          position={config.position}
          color={config.color}
          intensity={config.intensity}
          castShadow={config.castShadow}
          shadow-mapSize={[1024, 1024]}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
      );
    case 'point':
      return (
        <pointLight
          position={config.position}
          color={config.color}
          intensity={config.intensity}
          castShadow={config.castShadow}
        />
      );
    case 'spot':
      return (
        <spotLight
          position={config.position}
          color={config.color}
          intensity={config.intensity}
          castShadow={config.castShadow}
          angle={Math.PI / 6}
          penumbra={0.5}
        />
      );
    default:
      return null;
  }
}

export function Lights() {
  return (
    <>
      {SCENE_LIGHTS.map((light, index) => (
        <SceneLight key={index} config={light} />
      ))}
    </>
  );
}
