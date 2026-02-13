import { AdaptiveDpr, AdaptiveEvents, PerformanceMonitor } from '@react-three/drei';
import { useCallback } from 'react';

interface PerformanceProps {
  /** Minimum DPR when performance is poor */
  minDpr?: number;
  /** Maximum DPR when performance is good */
  maxDpr?: number;
  /** FPS threshold below which quality is reduced */
  declineThreshold?: number;
  /** FPS threshold above which quality is increased */
  inclineThreshold?: number;
  /** Callback when performance changes */
  onPerformanceChange?: (factor: number) => void;
}

const DEFAULT_MIN_DPR = 0.5;
const DEFAULT_MAX_DPR = 2;
const DEFAULT_DECLINE_THRESHOLD = 30;
const DEFAULT_INCLINE_THRESHOLD = 55;

export function Performance({
  minDpr: _minDpr = DEFAULT_MIN_DPR,
  maxDpr: _maxDpr = DEFAULT_MAX_DPR,
  declineThreshold: _declineThreshold = DEFAULT_DECLINE_THRESHOLD,
  inclineThreshold: _inclineThreshold = DEFAULT_INCLINE_THRESHOLD,
  onPerformanceChange,
}: PerformanceProps) {
  const handleIncline = useCallback(() => {
    onPerformanceChange?.(1);
  }, [onPerformanceChange]);

  const handleDecline = useCallback(() => {
    onPerformanceChange?.(0);
  }, [onPerformanceChange]);

  return (
    <>
      <PerformanceMonitor
        onIncline={handleIncline}
        onDecline={handleDecline}
        flipflops={3}
        onFallback={() => onPerformanceChange?.(0)}
      />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </>
  );
}
