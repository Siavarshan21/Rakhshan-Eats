import { useState, useCallback } from 'react';
import { z } from 'zod';

import { useCheckoutStore } from '../store/checkout.store';
import { useCart } from './useCart';
import { placeOrder } from '../services/checkout.api';
import type {
  CheckoutStep,
  DeliveryFormValues,
  PaymentFormValues,
  PlaceOrderResponse,
} from '../types';

// ---------------------------------------------------------------------------
// Validation Schemas
// ---------------------------------------------------------------------------

export const deliverySchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .max(100, 'Full name must be 100 characters or fewer'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
  address: z
    .string()
    .min(1, 'Address is required')
    .max(200, 'Address must be 200 characters or fewer'),
  city: z
    .string()
    .min(1, 'City is required')
    .max(100, 'City must be 100 characters or fewer'),
  state: z
    .string()
    .min(1, 'State is required')
    .max(100, 'State must be 100 characters or fewer'),
  zipCode: z
    .string()
    .min(1, 'ZIP code is required')
    .regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
  deliveryNotes: z
    .string()
    .max(500, 'Delivery notes must be 500 characters or fewer')
    .optional()
    .default(''),
});

export const paymentSchema = z
  .object({
    method: z.enum(['credit_card', 'debit_card', 'cash_on_delivery', 'digital_wallet']),
    cardNumber: z.string().optional().default(''),
    cardHolderName: z.string().optional().default(''),
    expiryDate: z.string().optional().default(''),
    cvv: z.string().optional().default(''),
  })
  .superRefine((data, ctx) => {
    if (data.method === 'credit_card' || data.method === 'debit_card') {
      if (!data.cardNumber || !/^\d{13,19}$/.test(data.cardNumber.replace(/\s/g, ''))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please enter a valid card number',
          path: ['cardNumber'],
        });
      }
      if (!data.cardHolderName || data.cardHolderName.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Cardholder name is required',
          path: ['cardHolderName'],
        });
      }
      if (!data.expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiryDate)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Enter expiry as MM/YY',
          path: ['expiryDate'],
        });
      }
      if (!data.cvv || !/^\d{3,4}$/.test(data.cvv)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Enter a valid CVV',
          path: ['cvv'],
        });
      }
    }
  });

// ---------------------------------------------------------------------------
// Initial form values
// ---------------------------------------------------------------------------

const INITIAL_DELIVERY: DeliveryFormValues = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  deliveryNotes: '',
};

const INITIAL_PAYMENT: PaymentFormValues = {
  method: 'credit_card',
  cardNumber: '',
  cardHolderName: '',
  expiryDate: '',
  cvv: '',
};

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useCheckout() {
  const checkoutStore = useCheckoutStore();
  const cart = useCart();

  const [deliveryValues, setDeliveryValues] = useState<DeliveryFormValues>(INITIAL_DELIVERY);
  const [paymentValues, setPaymentValues] = useState<PaymentFormValues>(INITIAL_PAYMENT);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState<PlaceOrderResponse | null>(null);

  // -------------------------------------------------------------------------
  // Validation helpers
  // -------------------------------------------------------------------------

  const validateDelivery = useCallback((): boolean => {
    const result = deliverySchema.safeParse(deliveryValues);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path.join('.');
        if (!fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  }, [deliveryValues]);

  const validatePayment = useCallback((): boolean => {
    const result = paymentSchema.safeParse(paymentValues);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path.join('.');
        if (!fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  }, [paymentValues]);

  // -------------------------------------------------------------------------
  // Step navigation
  // -------------------------------------------------------------------------

  const goToStep = useCallback(
    (step: CheckoutStep) => {
      checkoutStore.setStep(step);
      setErrors({});
    },
    [checkoutStore],
  );

  const nextStep = useCallback(() => {
    const { step } = checkoutStore;

    if (step === 'delivery') {
      if (validateDelivery()) {
        goToStep('payment');
      }
    } else if (step === 'payment') {
      if (validatePayment()) {
        goToStep('review');
      }
    }
  }, [checkoutStore, validateDelivery, validatePayment, goToStep]);

  const prevStep = useCallback(() => {
    const { step } = checkoutStore;

    if (step === 'payment') {
      goToStep('delivery');
    } else if (step === 'review') {
      goToStep('payment');
    }
  }, [checkoutStore, goToStep]);

  // -------------------------------------------------------------------------
  // Form field updates
  // -------------------------------------------------------------------------

  const updateDeliveryField = useCallback(
    (field: keyof DeliveryFormValues, value: string) => {
      setDeliveryValues((prev) => ({ ...prev, [field]: value }));
      // Clear the specific field error on change
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    [],
  );

  const updatePaymentField = useCallback(
    (field: keyof PaymentFormValues, value: string) => {
      setPaymentValues((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    [],
  );

  // -------------------------------------------------------------------------
  // Order submission
  // -------------------------------------------------------------------------

  const submitOrder = useCallback(async () => {
    if (!validateDelivery() || !validatePayment()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await placeOrder({
        items: cart.items,
        delivery: deliveryValues,
        payment: paymentValues,
        promoCode: cart.promoCode,
        subtotal: cart.subtotal,
        tax: cart.tax,
        deliveryFee: cart.deliveryFee,
        discount: cart.discount,
        total: cart.total,
      });

      setOrderResult(response);
      cart.clearCart();
      goToStep('complete');
    } catch {
      setErrors({ submit: 'Something went wrong placing your order. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }, [
    validateDelivery,
    validatePayment,
    cart,
    deliveryValues,
    paymentValues,
    goToStep,
  ]);

  // -------------------------------------------------------------------------
  // Reset
  // -------------------------------------------------------------------------

  const resetCheckout = useCallback(() => {
    checkoutStore.resetCheckout();
    setDeliveryValues(INITIAL_DELIVERY);
    setPaymentValues(INITIAL_PAYMENT);
    setErrors({});
    setOrderResult(null);
  }, [checkoutStore]);

  return {
    // Current step
    step: checkoutStore.step,

    // Form values
    deliveryValues,
    paymentValues,

    // Form actions
    updateDeliveryField,
    updatePaymentField,

    // Navigation
    nextStep,
    prevStep,
    goToStep,

    // Validation
    errors,

    // Submission
    isSubmitting,
    submitOrder,

    // Result
    orderResult,

    // Reset
    resetCheckout,
  };
}
