import { http, HttpResponse } from 'msw';

const API_BASE = 'http://localhost:8080/api/v1';

export const handlers = [
  http.get(`${API_BASE}/categories`, () => {
    return HttpResponse.json([
      { id: 'cat-1', name: 'Fruits & Vegetables', slug: 'fruits-vegetables' },
    ]);
  }),
  http.get(`${API_BASE}/products`, () => {
    return HttpResponse.json([
      { id: 'prod-1', name: 'Organic Bananas', price: 2.99 },
    ]);
  }),
  http.post(`${API_BASE}/checkout`, () => {
    return HttpResponse.json({ orderId: 'order-123', status: 'confirmed' });
  }),
  http.post(`${API_BASE}/promo/validate`, async ({ request }) => {
    const body = (await request.json()) as { code: string };
    if (body.code === 'SAVE10') {
      return HttpResponse.json({ valid: true, discount: 10, type: 'percentage' });
    }
    return HttpResponse.json({ valid: false }, { status: 400 });
  }),
];
