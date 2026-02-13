export const FEATURE_FLAGS = {
  enable3DView: import.meta.env.VITE_ENABLE_3D !== 'false',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  enableMockApi: import.meta.env.VITE_ENABLE_MOCK_API !== 'false',
  enableDarkMode: true,
  enablePromoCode: true,
  enableProductReviews: false,
  enableWishlist: false,
  enableOrderTracking: false,
} as const;
