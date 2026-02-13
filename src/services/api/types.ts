// ---------------------------------------------------------------------------
// API Service Types
// ---------------------------------------------------------------------------

/**
 * Standard API success response wrapper.
 *
 * @typeParam T - Shape of the payload carried in `data`.
 */
export interface ApiResponse<T> {
  /** Indicates the request succeeded. */
  success: true;
  /** The response payload. */
  data: T;
  /** Optional human-readable message from the server. */
  message?: string;
  /** ISO-8601 timestamp of the response. */
  timestamp: string;
}

/**
 * Paginated API success response.
 *
 * Extends the base {@link ApiResponse} with pagination metadata so consumers
 * can build "load more" / infinite-scroll UIs.
 *
 * @typeParam T - Shape of each item in the `data` array.
 */
export interface PaginatedApiResponse<T> {
  /** Indicates the request succeeded. */
  success: true;
  /** Array of items for the current page. */
  data: T[];
  /** Current page number (1-based). */
  currentPage: number;
  /** Number of items per page. */
  pageSize: number;
  /** Total number of items across all pages. */
  totalItems: number;
  /** Total number of pages. */
  totalPages: number;
  /** Whether a next page exists. */
  hasNextPage: boolean;
  /** Whether a previous page exists. */
  hasPreviousPage: boolean;
  /** Optional human-readable message from the server. */
  message?: string;
  /** ISO-8601 timestamp of the response. */
  timestamp: string;
}

/**
 * Standardised error payload returned (or constructed client-side) when an API
 * request fails.
 */
export interface ApiErrorPayload {
  /** Machine-readable error code (e.g. `VALIDATION_ERROR`). */
  code: string;
  /** Human-readable error description. */
  message: string;
  /** HTTP status code mirrored for convenience. */
  statusCode: number;
  /** Optional field-level validation errors. */
  fieldErrors?: Record<string, string[]>;
  /** ISO-8601 timestamp of the error. */
  timestamp?: string;
}
