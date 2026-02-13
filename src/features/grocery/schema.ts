import { z } from 'zod';

export const productFilterSchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  sortField: z.enum(['name', 'price', 'rating']).optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
});

export type ProductFilter = z.infer<typeof productFilterSchema>;
