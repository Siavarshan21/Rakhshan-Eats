// ---------------------------------------------------------------------------
// Rakhshan-Eats -- Type Index
// ---------------------------------------------------------------------------
// Barrel file that re-exports every public type from the types directory.
// Import from '@/types' (or 'src/types') for convenient access.
// ---------------------------------------------------------------------------

// Common / Shared
export type {
  Brand,
  ID,
  Timestamp,
  PaginationParams,
  PaginationMeta,
  SortDirection,
  SortConfig,
  ApiResponse,
  ApiError,
  SelectOption,
  Dimensions,
  Dimensions3D,
  Position,
  Position3D,
  AsyncState,
  RequireKeys,
  OptionalKeys,
  DeepReadonly,
  NonEmptyArray,
} from './common';

// Grocery Domain
export type {
  GroceryCategory,
  ProductBadge,
  NutritionFacts,
  GroceryProduct,
  ViewMode,
  ProductSortField,
  PriceRange,
  ProductFilters,
} from './grocery';

// Cart & Checkout
export type {
  CartItem,
  Cart,
  DiscountType,
  PromoCode,
  PaymentMethod,
  DeliveryTimeSlot,
  DeliveryInfo,
  PaymentInfo,
  CheckoutForm,
  OrderStatus,
  Order,
} from './cart';

// Three.js / 3-D Scene
export type {
  PerformanceLevel,
  CameraConfig,
  LightType,
  LightConfig,
  MaterialConfig,
  ShelfConfig,
  ProductPlacement,
  InteractionState,
  PerformanceSettings,
  SceneConfig,
  FogConfig,
  CameraAnimation,
} from './three';

// API / HTTP
export { HttpMethod } from './api';
export type {
  RequestConfig,
  ApiEndpoint,
  PaginatedResponse,
  ApiErrorResponse,
  ApiResult,
  RetryConfig,
  ApiInterceptors,
} from './api';

// User / Auth
export type {
  AddressType,
  Address,
  ThemePreference,
  LanguageCode,
  UserPreferences,
  UserStatus,
  AuthProvider,
  User,
  AuthTokens,
  LoginCredentials,
  RegisterPayload,
} from './user';
