// ---------------------------------------------------------------------------
// Notification Types
// ---------------------------------------------------------------------------

/**
 * Available notification variants.
 */
export type NotificationType = 'success' | 'error' | 'info' | 'loading';

/**
 * Configuration object for creating a notification.
 */
export interface NotificationConfig {
  /** The notification variant that determines styling / icon. */
  type: NotificationType;

  /** Human-readable message displayed inside the toast. */
  message: string;

  /**
   * How long (ms) the toast stays visible before auto-dismissing.
   *
   * Set to `0` or `Infinity` for toasts that must be dismissed manually
   * (e.g. loading indicators).
   */
  duration?: number;

  /**
   * Optional unique identifier. When provided, calling `dismiss(id)` will
   * remove only this specific toast.
   */
  id?: string;

  /**
   * Screen position where the toast appears.
   *
   * @default 'top-center'
   */
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
}
