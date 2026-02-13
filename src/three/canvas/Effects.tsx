import { EffectComposer, SSAO, Bloom } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Color } from 'three';
import { detectPerformanceLevel } from '../config/performance.config';
import { PERFORMANCE_CONFIGS } from '../config/performance.config';

interface EffectsProps {
  enableAO?: boolean;
  enableBloom?: boolean;
}

const SSAO_COLOR = new Color('#000000');

export function Effects({ enableAO = true, enableBloom = false }: EffectsProps) {
  const level = detectPerformanceLevel();
  const config = PERFORMANCE_CONFIGS[level];

  if (!config.enablePostProcessing) return null;

  if (enableAO && enableBloom) {
    return (
      <EffectComposer multisampling={0}>
        <SSAO
          blendFunction={BlendFunction.MULTIPLY}
          samples={16}
          radius={0.1}
          intensity={15}
          luminanceInfluence={0.6}
          color={SSAO_COLOR}
          worldDistanceThreshold={1}
          worldDistanceFalloff={0}
          worldProximityThreshold={0.5}
          worldProximityFalloff={0.3}
        />
        <Bloom
          intensity={0.3}
          luminanceThreshold={0.8}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    );
  }

  if (enableAO) {
    return (
      <EffectComposer multisampling={0}>
        <SSAO
          blendFunction={BlendFunction.MULTIPLY}
          samples={16}
          radius={0.1}
          intensity={15}
          luminanceInfluence={0.6}
          color={SSAO_COLOR}
          worldDistanceThreshold={1}
          worldDistanceFalloff={0}
          worldProximityThreshold={0.5}
          worldProximityFalloff={0.3}
        />
      </EffectComposer>
    );
  }

  if (enableBloom) {
    return (
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.3}
          luminanceThreshold={0.8}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    );
  }

  return null;
}
