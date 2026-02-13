import { useState, useCallback } from 'react';

import type { PromoDefinition, PromoValidationResult } from '../types';

const VALID_PROMOS: Record<string, PromoDefinition> = {
  SAVE10: { type: 'percentage' as const, value: 10 },
  FLAT5: { type: 'fixed' as const, value: 5 },
  WELCOME20: { type: 'percentage' as const, value: 20 },
};

interface UsePromoOptions {
  subtotal: number;
  onApply: (code: string, discount: number) => void;
  onRemove: () => void;
}

export function usePromo({ subtotal, onApply, onRemove }: UsePromoOptions) {
  const [code, setCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [result, setResult] = useState<PromoValidationResult | null>(null);

  const validate = useCallback(
    async (promoCode: string): Promise<PromoValidationResult> => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const normalized = promoCode.trim().toUpperCase();
      const promo = VALID_PROMOS[normalized];

      if (!promo) {
        return {
          valid: false,
          discount: 0,
          message: 'Invalid promo code. Please try again.',
        };
      }

      if (subtotal <= 0) {
        return {
          valid: false,
          discount: 0,
          message: 'Add items to your cart before applying a promo code.',
        };
      }

      const discount =
        promo.type === 'percentage'
          ? (subtotal * promo.value) / 100
          : Math.min(promo.value, subtotal);

      return {
        valid: true,
        discount: Math.round(discount * 100) / 100,
        message: `Promo code "${normalized}" applied! You save $${discount.toFixed(2)}.`,
      };
    },
    [subtotal],
  );

  const applyPromo = useCallback(async () => {
    if (!code.trim()) {
      setResult({
        valid: false,
        discount: 0,
        message: 'Please enter a promo code.',
      });
      return;
    }

    setIsValidating(true);
    setResult(null);

    try {
      const validationResult = await validate(code);
      setResult(validationResult);

      if (validationResult.valid) {
        onApply(code.trim().toUpperCase(), validationResult.discount);
      }
    } finally {
      setIsValidating(false);
    }
  }, [code, validate, onApply]);

  const removePromo = useCallback(() => {
    setCode('');
    setResult(null);
    onRemove();
  }, [onRemove]);

  const clearResult = useCallback(() => {
    setResult(null);
  }, []);

  return {
    code,
    setCode,
    isValidating,
    result,
    applyPromo,
    removePromo,
    clearResult,
  };
}
