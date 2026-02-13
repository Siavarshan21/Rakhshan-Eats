/**
 * Linear interpolation between two values.
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Smooth-step interpolation (Hermite). Returns a value in [0,1].
 */
export function smoothStep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/**
 * Smoother step interpolation (Ken Perlin). Returns a value in [0,1].
 */
export function smootherStep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * t * (t * (t * 6 - 15) + 10);
}

/**
 * Ease-in-out (sinusoidal). Input/output in [0,1].
 */
export function easeInOut(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

/**
 * Ease-in (quadratic). Input/output in [0,1].
 */
export function easeIn(t: number): number {
  return t * t;
}

/**
 * Ease-out (quadratic). Input/output in [0,1].
 */
export function easeOut(t: number): number {
  return 1 - (1 - t) * (1 - t);
}

/**
 * Elastic ease-out. Useful for bouncy effects.
 */
export function easeOutElastic(t: number): number {
  if (t === 0 || t === 1) return t;
  const c4 = (2 * Math.PI) / 3;
  return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
}

/**
 * Bounce ease-out.
 */
export function easeOutBounce(t: number): number {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (t < 1 / d1) {
    return n1 * t * t;
  } else if (t < 2 / d1) {
    return n1 * (t -= 1.5 / d1) * t + 0.75;
  } else if (t < 2.5 / d1) {
    return n1 * (t -= 2.25 / d1) * t + 0.9375;
  } else {
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
  }
}

interface SpringConfig {
  stiffness: number;
  damping: number;
  mass: number;
}

interface SpringState {
  position: number;
  velocity: number;
}

const DEFAULT_SPRING: SpringConfig = {
  stiffness: 170,
  damping: 26,
  mass: 1,
};

/**
 * Compute a single spring physics step.
 * Returns the new position and velocity.
 */
export function springStep(
  current: SpringState,
  target: number,
  deltaTime: number,
  config: SpringConfig = DEFAULT_SPRING,
): SpringState {
  const { stiffness, damping, mass } = config;
  const displacement = current.position - target;
  const springForce = -stiffness * displacement;
  const dampingForce = -damping * current.velocity;
  const acceleration = (springForce + dampingForce) / mass;

  const newVelocity = current.velocity + acceleration * deltaTime;
  const newPosition = current.position + newVelocity * deltaTime;

  return { position: newPosition, velocity: newVelocity };
}

/**
 * Check if a spring has settled (close enough to target with negligible velocity).
 */
export function isSpringSettled(
  state: SpringState,
  target: number,
  positionThreshold = 0.001,
  velocityThreshold = 0.001,
): boolean {
  return (
    Math.abs(state.position - target) < positionThreshold &&
    Math.abs(state.velocity) < velocityThreshold
  );
}
