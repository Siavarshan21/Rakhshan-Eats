// ---------------------------------------------------------------------------
// Common / Shared Types
// ---------------------------------------------------------------------------

/** Branded type helper -- produces a nominal type alias backed by `T`. */
export type Brand<T, B extends string> = T & { readonly __brand: B };

/** Unique identifier (string-based). */
export type ID = Brand<string, 'ID'>;

/** ISO-8601 date-time string. */
export type Timestamp = Brand<string, 'Timestamp'>;

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

/** Pagination parameters sent with list requests. */
export interface PaginationParams {
  /** Current page number (1-based). */
  page: number;
  /** Number of items per page. */
  pageSize: number;
}

/** Pagination metadata returned from the API alongside a list response. */
export interface PaginationMeta {
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
}

// ---------------------------------------------------------------------------
// Sorting
// ---------------------------------------------------------------------------

/** Sort direction. */
export type SortDirection = 'asc' | 'desc';

/** Generic sort configuration. `F` constrains the allowed field names. */
export interface SortConfig<F extends string = string> {
  /** The field to sort by. */
  field: F;
  /** The direction of the sort. */
  direction: SortDirection;
}

// ---------------------------------------------------------------------------
// API Envelope
// ---------------------------------------------------------------------------

/**
 * Standard API success response wrapper.
 *
 * @typeParam T - The shape of the payload carried in `data`.
 */
export interface ApiResponse<T> {
  /** Indicates the request succeeded. */
  success: true;
  /** The response payload. */
  data: T;
  /** Optional human-readable message. */
  message?: string;
  /** Optional pagination metadata (present for list endpoints). */
  pagination?: PaginationMeta;
  /** ISO-8601 timestamp of the response. */
  timestamp: Timestamp;
}

/**
 * Standardised API error object.
 */
export interface ApiError {
  /** Machine-readable error code (e.g. `VALIDATION_ERROR`). */
  code: string;
  /** Human-readable error message. */
  message: string;
  /** Optional field-level validation errors. */
  fieldErrors?: Record<string, string[]>;
  /** HTTP status code mirrored for convenience. */
  statusCode: number;
  /** ISO-8601 timestamp of the error. */
  timestamp: Timestamp;
}

// ---------------------------------------------------------------------------
// UI Helpers
// ---------------------------------------------------------------------------

/**
 * Option for `<select>`, radio groups, or any list of labelled values.
 *
 * @typeParam V - The type of the option value (defaults to `string`).
 */
export interface SelectOption<V = string> {
  /** Display label. */
  label: string;
  /** Underlying value. */
  value: V;
  /** Whether the option is disabled. */
  disabled?: boolean;
  /** Optional grouping key for grouped selects. */
  group?: string;
}

// ---------------------------------------------------------------------------
// Geometry
// ---------------------------------------------------------------------------

/** Width / height pair in arbitrary units. */
export interface Dimensions {
  width: number;
  height: number;
}

/** Three-dimensional size. */
export interface Dimensions3D extends Dimensions {
  depth: number;
}

/** 2-D position. */
export interface Position {
  x: number;
  y: number;
}

/** 3-D position. */
export interface Position3D extends Position {
  z: number;
}

// ---------------------------------------------------------------------------
// Async / Loading State
// ---------------------------------------------------------------------------

/** Discriminated union describing all states of an async operation. */
export type AsyncState<T, E = ApiError> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: E };

// ---------------------------------------------------------------------------
// Utility Types
// ---------------------------------------------------------------------------

/** Make selected keys of `T` required. */
export type RequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

/** Make selected keys of `T` optional. */
export type OptionalKeys<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

/** Extract the resolved value type from a `Promise`. */
export type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

/** Deeply make every property read-only. */
export type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

/** Non-empty array -- guarantees at least one element. */
export type NonEmptyArray<T> = [T, ...T[]];
