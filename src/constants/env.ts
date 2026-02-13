export const ENV = {
  API_BASE_URL:
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  ENABLE_3D: import.meta.env.VITE_ENABLE_3D !== 'false',
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_MOCK_API: import.meta.env.VITE_ENABLE_MOCK_API !== 'false',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Rakhshan Eats',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  GA_TRACKING_ID: import.meta.env.VITE_GA_TRACKING_ID || '',
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN || '',
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const;
