// ---------------------------------------------------------------------------
// Logger Service
// ---------------------------------------------------------------------------

import { LOG_LEVELS, LOGGER_CONFIG } from './config';
import type { LogLevel } from './config';

/**
 * Lightweight logger that writes to the browser console in development and
 * can be extended to ship logs to a remote service in production.
 *
 * Log calls below the configured minimum level are silently dropped.
 */
export const LoggerService = {
  /**
   * Informational message (level = INFO).
   */
  info(message: string, ...args: unknown[]): void {
    log('info', message, args);
  },

  /**
   * Warning message (level = WARN).
   */
  warn(message: string, ...args: unknown[]): void {
    log('warn', message, args);
  },

  /**
   * Error message (level = ERROR).
   */
  error(message: string, ...args: unknown[]): void {
    log('error', message, args);
  },

  /**
   * Debug message (level = DEBUG). Only emitted when the configured minimum
   * level is DEBUG.
   */
  debug(message: string, ...args: unknown[]): void {
    log('debug', message, args);
  },
};

// ---- Internal helpers -------------------------------------------------------

/**
 * Returns `true` when the given level should be emitted according to the
 * current configuration.
 */
function shouldLog(level: LogLevel): boolean {
  if (!LOGGER_CONFIG.enabled) {
    return false;
  }

  return LOG_LEVELS[level] >= LOG_LEVELS[LOGGER_CONFIG.minLevel];
}

/**
 * Core logging function. In development mode, messages are written to the
 * browser console. In production the function is a no-op by default but can
 * be extended to POST log entries to a remote aggregation service.
 */
function log(level: LogLevel, message: string, args: unknown[]): void {
  if (!shouldLog(level)) {
    return;
  }

  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    const consoleFn = level === 'debug' ? console.debug : console[level];
    consoleFn(`${prefix} ${message}`, ...args);
  } else {
    // In production you could send logs to a remote service, for example:
    //
    // fetch('/api/logs', {
    //   method: 'POST',
    //   body: JSON.stringify({ level, message, args, timestamp }),
    // });
    //
    // For now, errors are still logged to the console so they surface in
    // production debugging tools (e.g. Sentry breadcrumbs).
    if (level === 'error') {
      // eslint-disable-next-line no-console
      console.error(`${prefix} ${message}`, ...args);
    }
  }
}
