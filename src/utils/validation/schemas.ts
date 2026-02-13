import { z } from 'zod';

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be 50 characters or fewer'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be 50 characters or fewer'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
  address: z
    .string()
    .min(1, 'Address is required')
    .max(200, 'Address must be 200 characters or fewer'),
  city: z.string().min(1, 'City is required').max(100, 'City must be 100 characters or fewer'),
  state: z.string().min(1, 'State is required').max(100, 'State must be 100 characters or fewer'),
  zipCode: z
    .string()
    .min(1, 'ZIP code is required')
    .regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
  deliveryNotes: z.string().max(500, 'Delivery notes must be 500 characters or fewer').optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

export const promoCodeSchema = z.object({
  code: z
    .string()
    .min(1, 'Promo code is required')
    .max(20, 'Promo code must be 20 characters or fewer')
    .regex(/^[A-Z0-9]+$/, 'Promo code must contain only uppercase letters and numbers'),
});

export type PromoCodeData = z.infer<typeof promoCodeSchema>;

export const productFilterSchema = z.object({
  category: z.string().optional(),
  minPrice: z.number().nonnegative('Minimum price must be non-negative').optional(),
  maxPrice: z.number().positive('Maximum price must be positive').optional(),
  sortBy: z.enum(['price-asc', 'price-desc', 'name-asc', 'name-desc', 'newest']).optional(),
  searchQuery: z.string().max(200, 'Search query too long').optional(),
  inStock: z.boolean().optional(),
});

export type ProductFilterData = z.infer<typeof productFilterSchema>;
