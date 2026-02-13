// ---------------------------------------------------------------------------
// HTTP Client – Axios instance pre-configured with project defaults
// ---------------------------------------------------------------------------

import axios from 'axios';

import { setupInterceptors } from './interceptors';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;

/**
 * Shared Axios instance used by every service / hook that talks to the API.
 *
 * - `baseURL` and `timeout` are pulled from Vite env vars with sensible
 *   fallbacks for local development.
 * - Request & response interceptors are wired up automatically (see
 *   `./interceptors.ts`).
 */
export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach request / response interceptors
setupInterceptors(httpClient);
