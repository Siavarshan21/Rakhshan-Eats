/**
 * Physics hook placeholder for optional physics integration.
 * Currently unused - would integrate with @react-three/rapier or cannon-es.
 */
export function usePhysics() {
  return {
    enabled: false,
    gravity: [0, -9.81, 0] as const,
  };
}
