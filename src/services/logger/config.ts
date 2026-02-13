// ---------------------------------------------------------------------------
// Logger Configuration
// ---------------------------------------------------------------------------

/**
 * Supported log levels ordered from least to most severe.
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * Numeric weight for each log level. Messages with a weight below the
 * configured minimum are silently dropped.
 */
export const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
} as const;

/**
 * Runtime logger configuration.
 *
 * - In **development** mode, all messages (DEBUG and above) are emitted.
 * - In **production** mode, only warnings and errors are emitted.
 * - Set `enabled` to `false` to silence the logger entirely.
 */
export const LOGGER_CONFIG = {
  /** Whether the logger is active at all. */
  enabled: true,

  /**
   * Minimum level required for a message to be emitted.
   *
   * Anything below this level is silently dropped.
   */
  minLevel: (import.meta.env.DEV ? 'debug' : 'warn') as LogLevel,
} as const;
