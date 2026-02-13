import { httpClient } from '../../../services/api/http';
import { getMockCategories, getMockProducts, getMockProductsByCategory, getMockProductBySlug } from './grocery.mock';

const USE_MOCK = import.meta.env.VITE_ENABLE_MOCK_API !== 'false';

export const groceryApi = {
  getCategories: async () => {
    if (USE_MOCK) return getMockCategories();
    const { data } = await httpClient.get('/categories');
    return data;
  },
  getProducts: async () => {
    if (USE_MOCK) return getMockProducts();
    const { data } = await httpClient.get('/products');
    return data;
  },
  getProductsByCategory: async (categorySlug: string) => {
    if (USE_MOCK) return getMockProductsByCategory(categorySlug);
    const { data } = await httpClient.get(`/categories/${categorySlug}/products`);
    return data;
  },
  getProductBySlug: async (slug: string) => {
    if (USE_MOCK) return getMockProductBySlug(slug);
    const { data } = await httpClient.get(`/products/slug/${slug}`);
    return data;
  },
};
