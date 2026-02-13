// ---------------------------------------------------------------------------
// API / HTTP Types
// ---------------------------------------------------------------------------

import type { ApiError, PaginationMeta, Timestamp } from './common';

// ---------------------------------------------------------------------------
// HTTP Method
// ---------------------------------------------------------------------------

/** Standard HTTP methods used by the API client. */
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

// ---------------------------------------------------------------------------
// Request
// ---------------------------------------------------------------------------

/**
 * Configuration for a single HTTP request.
 *
 * @typeParam TBody - Shape of the request body (defaults to `unknown`).
 */
export interface RequestConfig<TBody = unknown> {
  /** Target URL (relative to the API base URL). */
  url: string;
  /** HTTP method. */
  method: HttpMethod;
  /** Request body payload (ignored for GET / DELETE). */
  body?: TBody;
  /** URL query-string parameters. */
  params?: Record<string, string | number | boolean | undefined>;
  /** Additional HTTP headers. */
  headers?: Record<string, string>;
  /** Per-request timeout in milliseconds (overrides the global default). */
  timeout?: number;
  /** Whether to include credentials (cookies) with the request. */
  withCredentials?: boolean;
  /** AbortSignal for request cancellation. */
  signal?: AbortSignal;
}

// ---------------------------------------------------------------------------
// Endpoint Descriptor
// ---------------------------------------------------------------------------

/**
 * Declarative description of an API endpoint.
 *
 * Useful for route maps and code-generated API clients.
 */
export interface ApiEndpoint {
  /** Unique key identifying this endpoint (e.g. `"getProducts"`). */
  key: string;
  /** URL path template (may contain `:param` placeholders). */
  path: string;
  /** HTTP method. */
  method: HttpMethod;
  /** Whether authentication is required. */
  requiresAuth: boolean;
  /** Human-readable description of the endpoint. */
  description: string;
}

// ---------------------------------------------------------------------------
// Paginated Response
// ---------------------------------------------------------------------------

/**
 * API response wrapper for paginated list endpoints.
 *
 * @typeParam T - The type of each item in the list.
 */
export interface PaginatedResponse<T> {
  /** Indicates the request succeeded. */
  success: true;
  /** Array of items for the current page. */
  data: T[];
  /** Pagination metadata. */
  pagination: PaginationMeta;
  /** ISO-8601 timestamp of the response. */
  timestamp: Timestamp;
}

// ---------------------------------------------------------------------------
// Error Response
// ---------------------------------------------------------------------------

/**
 * Shape of an error response returned by the API.
 */
export interface ApiErrorResponse {
  /** Indicates the request failed. */
  success: false;
  /** Structured error details. */
  error: ApiError;
  /** ISO-8601 timestamp of the response. */
  timestamp: Timestamp;
}

// ---------------------------------------------------------------------------
// Discriminated Response Union
// ---------------------------------------------------------------------------

/**
 * Discriminated union of success and error responses.
 *
 * Callers can narrow on `success` to determine the variant.
 *
 * @typeParam T - The type of the success payload.
 */
export type ApiResult<T> =
  | { success: true; data: T; timestamp: Timestamp }
  | { success: false; error: ApiError; timestamp: Timestamp };

// ---------------------------------------------------------------------------
// Retry
// ---------------------------------------------------------------------------

/**
 * Configuration for automatic request retry behaviour.
 */
export interface RetryConfig {
  /** Maximum number of retry attempts. */
  maxRetries: number;
  /** Base delay between retries in milliseconds. */
  baseDelay: number;
  /** Maximum delay between retries in milliseconds (caps exponential back-off). */
  maxDelay: number;
  /** HTTP status codes that are eligible for retry. */
  retryableStatusCodes: number[];
}

// ---------------------------------------------------------------------------
// Interceptors
// ---------------------------------------------------------------------------

/**
 * Functions that intercept requests / responses for logging, auth injection, etc.
 */
export interface ApiInterceptors {
  /** Called before each request is sent. */
  onRequest?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
  /** Called after a successful response is received. */
  onResponse?: <T>(response: PaginatedResponse<T> | ApiResult<T>) => void;
  /** Called when a request fails. */
  onError?: (error: ApiError) => void;
}
