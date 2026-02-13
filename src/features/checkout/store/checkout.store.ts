import { create } from 'zustand';

import type { DeliveryInfo, PaymentMethod } from '../../../types/cart';

type CheckoutStep = 'delivery' | 'payment' | 'review' | 'complete';

interface CheckoutState {
  step: CheckoutStep;
  deliveryInfo: DeliveryInfo | null;
  paymentMethod: PaymentMethod | null;
}

interface CheckoutActions {
  setStep: (step: CheckoutStep) => void;
  setDeliveryInfo: (info: DeliveryInfo) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  resetCheckout: () => void;
}

const initialState: CheckoutState = {
  step: 'delivery',
  deliveryInfo: null,
  paymentMethod: null,
};

export const useCheckoutStore = create<CheckoutState & CheckoutActions>(
  (set) => ({
    ...initialState,

    setStep: (step) => set({ step }),
    setDeliveryInfo: (info) => set({ deliveryInfo: info }),
    setPaymentMethod: (method) => set({ paymentMethod: method }),
    resetCheckout: () => set(initialState),
  }),
);
