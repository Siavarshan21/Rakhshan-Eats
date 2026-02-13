import type { LightConfig } from '../types';

export const SCENE_LIGHTS: LightConfig[] = [
  {
    type: 'ambient',
    color: '#ffffff',
    intensity: 0.4,
  },
  {
    type: 'directional',
    position: [10, 20, 10],
    color: '#ffffff',
    intensity: 0.8,
    castShadow: true,
  },
  {
    type: 'point',
    position: [-5, 8, -5],
    color: '#ffeedd',
    intensity: 0.3,
  },
  {
    type: 'point',
    position: [5, 8, 5],
    color: '#ddeeff',
    intensity: 0.3,
  },
];
