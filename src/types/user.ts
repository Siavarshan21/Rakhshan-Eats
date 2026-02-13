// ---------------------------------------------------------------------------
// User / Auth Types (prepared for future implementation)
// ---------------------------------------------------------------------------

import type { ID, Timestamp } from './common';

// ---------------------------------------------------------------------------
// Address
// ---------------------------------------------------------------------------

/** Type of saved address. */
export type AddressType = 'home' | 'work' | 'other';

/**
 * A saved delivery address belonging to a user.
 */
export interface Address {
  /** Unique address identifier. */
  id: ID;
  /** Human-readable label (e.g. "Home", "Office"). */
  label: string;
  /** Address type discriminator. */
  type: AddressType;
  /** Street address line 1. */
  addressLine1: string;
  /** Street address line 2 (apt, suite, etc.). */
  addressLine2: string;
  /** City / town. */
  city: string;
  /** State / province / region. */
  state: string;
  /** Postal / ZIP code. */
  postalCode: string;
  /** Country code (ISO 3166-1 alpha-2). */
  country: string;
  /** Geographic latitude. */
  latitude: number;
  /** Geographic longitude. */
  longitude: number;
  /** Whether this is the user's default delivery address. */
  isDefault: boolean;
}

// ---------------------------------------------------------------------------
// User Preferences
// ---------------------------------------------------------------------------

/** Supported UI theme. */
export type ThemePreference = 'light' | 'dark' | 'system';

/** Supported display language. */
export type LanguageCode = 'en' | 'fa' | 'ar';

/**
 * User-level preferences and settings.
 */
export interface UserPreferences {
  /** Selected UI theme. */
  theme: ThemePreference;
  /** Selected display language. */
  language: LanguageCode;
  /** Whether the user has opted in to email notifications. */
  emailNotifications: boolean;
  /** Whether the user has opted in to push notifications. */
  pushNotifications: boolean;
  /** Whether the user has opted in to SMS notifications. */
  smsNotifications: boolean;
  /** Default view mode in the product catalogue. */
  defaultViewMode: '2d' | '3d';
  /** Whether to auto-play 3-D product animations. */
  autoPlay3D: boolean;
}

// ---------------------------------------------------------------------------
// User
// ---------------------------------------------------------------------------

/** Account status. */
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending_verification';

/** Authentication provider. */
export type AuthProvider = 'email' | 'google' | 'apple';

/**
 * Represents an authenticated user of the application.
 */
export interface User {
  /** Unique user identifier. */
  id: ID;
  /** User's email address. */
  email: string;
  /** Display name. */
  displayName: string;
  /** First name. */
  firstName: string;
  /** Last name. */
  lastName: string;
  /** URL of the user's avatar image. */
  avatarUrl: string | null;
  /** Phone number (E.164 format). */
  phone: string | null;
  /** Account status. */
  status: UserStatus;
  /** Authentication provider used to create the account. */
  authProvider: AuthProvider;
  /** Whether the user's email has been verified. */
  emailVerified: boolean;
  /** Saved delivery addresses. */
  addresses: Address[];
  /** User preferences and settings. */
  preferences: UserPreferences;
  /** ISO-8601 timestamp of account creation. */
  createdAt: Timestamp;
  /** ISO-8601 timestamp of last profile update. */
  updatedAt: Timestamp;
  /** ISO-8601 timestamp of last successful login. */
  lastLoginAt: Timestamp | null;
}

// ---------------------------------------------------------------------------
// Auth Tokens
// ---------------------------------------------------------------------------

/**
 * JWT token pair returned after authentication.
 */
export interface AuthTokens {
  /** Short-lived access token. */
  accessToken: string;
  /** Long-lived refresh token. */
  refreshToken: string;
  /** Access token lifetime in seconds. */
  expiresIn: number;
  /** Token type (always `"Bearer"`). */
  tokenType: 'Bearer';
}

// ---------------------------------------------------------------------------
// Auth Actions
// ---------------------------------------------------------------------------

/**
 * Credentials for email-based login.
 */
export interface LoginCredentials {
  email: string;
  password: string;
  /** Whether to persist the session across browser restarts. */
  rememberMe: boolean;
}

/**
 * Payload for creating a new user account.
 */
export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}
