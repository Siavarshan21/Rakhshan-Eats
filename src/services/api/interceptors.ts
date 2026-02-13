// ---------------------------------------------------------------------------
// Axios Interceptors – auth token injection & global error handling
// ---------------------------------------------------------------------------

import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const AUTH_TOKEN_KEY = 'auth_token';

// ---- Request interceptor ----------------------------------------------------

/**
 * Injects the stored auth token (if any) into every outgoing request as a
 * Bearer token.
 */
function onRequest(
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

function onRequestError(error: AxiosError): Promise<AxiosError> {
  return Promise.reject(error);
}

// ---- Response interceptor ---------------------------------------------------

/**
 * Passes successful responses through unchanged.
 */
function onResponse(response: import('axios').AxiosResponse) {
  return response;
}

/**
 * Centralised error handler:
 *
 * - **401 Unauthorized** – clears the stored token and redirects to the home
 *   page so the user can log in again.
 * - **Other errors** – logs the problem in development mode and re-throws.
 */
function onResponseError(error: AxiosError): Promise<AxiosError> {
  const status = error.response?.status;

  if (status === 401) {
    localStorage.removeItem(AUTH_TOKEN_KEY);

    // Only redirect when running in the browser (not in tests / SSR).
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }

  if (import.meta.env.DEV) {
    const url = error.config?.url ?? 'unknown';
    const method = error.config?.method?.toUpperCase() ?? 'UNKNOWN';
    // eslint-disable-next-line no-console
    console.error(`[HTTP ${status ?? 'NETWORK'}] ${method} ${url}`, error);
  }

  return Promise.reject(error);
}

// ---- Public setup -----------------------------------------------------------

/**
 * Attach request & response interceptors to the given Axios instance.
 *
 * Call this once when the shared `httpClient` is created.
 */
export function setupInterceptors(instance: AxiosInstance): void {
  instance.interceptors.request.use(onRequest, onRequestError);
  instance.interceptors.response.use(onResponse, onResponseError);
}
