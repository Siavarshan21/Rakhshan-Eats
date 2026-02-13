import { useCartStore } from '../store/cart.store';

const TAX_RATE = 0.08;
const FREE_DELIVERY_THRESHOLD = 50;
const DELIVERY_FEE = 5.99;

export function useCart() {
  const store = useCartStore();
  const subtotal = store.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const discount = store.promoDiscount;
  const total = Math.max(0, subtotal + tax + deliveryFee - discount);
  const itemCount = store.items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items: store.items,
    subtotal,
    tax,
    deliveryFee,
    discount,
    total,
    itemCount,
    promoCode: store.promoCode,
    addItem: store.addItem,
    removeItem: store.removeItem,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
    applyPromo: store.applyPromo,
    removePromo: store.removePromo,
  };
}
