// ---------------------------------------------------------------------------
// Notification Service – thin wrapper around react-hot-toast
// ---------------------------------------------------------------------------

import toast from 'react-hot-toast';

/** Default duration (ms) for auto-dismissing toasts. */
const TOAST_DURATION_MS = 4000;

/**
 * Application-wide notification helpers.
 *
 * Wrapping `react-hot-toast` behind a service object means:
 * - call-sites stay decoupled from the toast library,
 * - swapping to a different notification library requires changes in one file.
 */
export const NotificationService = {
  /** Show a success toast with a green check icon. */
  success: (message: string) =>
    toast.success(message, { duration: TOAST_DURATION_MS }),

  /** Show an error toast with a red cross icon. */
  error: (message: string) =>
    toast.error(message, { duration: TOAST_DURATION_MS }),

  /** Show a neutral informational toast (no icon). */
  info: (message: string) =>
    toast(message, { duration: TOAST_DURATION_MS }),

  /**
   * Show a loading toast that stays visible until explicitly dismissed.
   *
   * @returns The toast id which can be passed to {@link dismiss} later.
   */
  loading: (message: string) => toast.loading(message),

  /**
   * Dismiss a specific toast by id, or dismiss **all** toasts if no id is
   * provided.
   */
  dismiss: (id?: string) => toast.dismiss(id),
};
