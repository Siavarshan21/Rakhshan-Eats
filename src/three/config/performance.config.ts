import type { PerformanceConfig, PerformanceLevel } from '../types';

export const PERFORMANCE_CONFIGS: Record<PerformanceLevel, PerformanceConfig> = {
  low: {
    level: 'low',
    maxInstances: 50,
    enableShadows: false,
    enablePostProcessing: false,
    pixelRatio: 1,
    antialias: false,
  },
  medium: {
    level: 'medium',
    maxInstances: 150,
    enableShadows: true,
    enablePostProcessing: false,
    pixelRatio: 1.5,
    antialias: true,
  },
  high: {
    level: 'high',
    maxInstances: 300,
    enableShadows: true,
    enablePostProcessing: true,
    pixelRatio: 2,
    antialias: true,
  },
};

export function detectPerformanceLevel(): PerformanceLevel {
  if (typeof window === 'undefined') return 'medium';

  const gl = document.createElement('canvas').getContext('webgl');
  if (!gl) return 'low';

  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  if (!debugInfo) return 'medium';

  const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  if (isMobile) return 'low';
  if (/Intel|integrated/i.test(renderer)) return 'medium';

  return 'high';
}
