import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useCheckout } from '../hooks/useCheckout';
import { useCart } from '../hooks/useCart';
import { Input } from '../../../components/ui/Input/Input';
import { cn } from '../../../utils/helpers/classNames';
import { formatCurrency } from '../../../utils/format/currency';
import PaymentMethod from './PaymentMethod';
import { CHECKOUT_STEPS } from '../types';
import type { CheckoutStep } from '../types';

// ---------------------------------------------------------------------------
// Step indicator
// ---------------------------------------------------------------------------

const StepIndicator: React.FC<{ currentStep: CheckoutStep }> = ({
  currentStep,
}) => {
  const currentIndex = CHECKOUT_STEPS.findIndex((s) => s.key === currentStep);

  return (
    <nav aria-label="Checkout progress" className="mb-8">
      <ol className="flex items-center">
        {CHECKOUT_STEPS.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = step.key === currentStep;

          return (
            <li
              key={step.key}
              className={cn(
                'flex items-center',
                index < CHECKOUT_STEPS.length - 1 && 'flex-1',
              )}
            >
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-colors duration-200',
                    isCompleted &&
                      'bg-emerald-600 text-white',
                    isCurrent &&
                      'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-600',
                    !isCompleted &&
                      !isCurrent &&
                      'bg-gray-100 text-gray-400',
                  )}
                >
                  {isCompleted ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    step.number
                  )}
                </span>
                <span
                  className={cn(
                    'hidden sm:block text-sm font-medium',
                    isCurrent ? 'text-emerald-700' : 'text-gray-500',
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {index < CHECKOUT_STEPS.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-4 transition-colors duration-200',
                    isCompleted ? 'bg-emerald-500' : 'bg-gray-200',
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

// ---------------------------------------------------------------------------
// Delivery Step
// ---------------------------------------------------------------------------

const DeliveryStep: React.FC<{
  values: ReturnType<typeof useCheckout>['deliveryValues'];
  onFieldChange: ReturnType<typeof useCheckout>['updateDeliveryField'];
  errors: Record<string, string>;
}> = ({ values, onFieldChange, errors }) => {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-gray-900">
        Delivery Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={values.fullName}
            onChange={(e) => onFieldChange('fullName', e.target.value)}
            error={errors.fullName}
            fullWidth
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          value={values.email}
          onChange={(e) => onFieldChange('email', e.target.value)}
          error={errors.email}
          fullWidth
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="+1234567890"
          value={values.phone}
          onChange={(e) => onFieldChange('phone', e.target.value)}
          error={errors.phone}
          fullWidth
        />

        <div className="sm:col-span-2">
          <Input
            label="Street Address"
            placeholder="123 Main St, Apt 4B"
            value={values.address}
            onChange={(e) => onFieldChange('address', e.target.value)}
            error={errors.address}
            fullWidth
          />
        </div>

        <Input
          label="City"
          placeholder="New York"
          value={values.city}
          onChange={(e) => onFieldChange('city', e.target.value)}
          error={errors.city}
          fullWidth
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="State"
            placeholder="NY"
            value={values.state}
            onChange={(e) => onFieldChange('state', e.target.value)}
            error={errors.state}
            fullWidth
          />

          <Input
            label="ZIP Code"
            placeholder="10001"
            value={values.zipCode}
            onChange={(e) => onFieldChange('zipCode', e.target.value)}
            error={errors.zipCode}
            fullWidth
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="deliveryNotes"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Delivery Notes (Optional)
          </label>
          <textarea
            id="deliveryNotes"
            rows={3}
            placeholder="Gate code, building instructions, etc."
            value={values.deliveryNotes}
            onChange={(e) => onFieldChange('deliveryNotes', e.target.value)}
            className="w-full px-4 py-2 text-base border border-gray-300 rounded-lg bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 resize-none"
          />
          {errors.deliveryNotes && (
            <p className="mt-1 text-sm text-red-600">{errors.deliveryNotes}</p>
          )}
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Payment Step
// ---------------------------------------------------------------------------

const PaymentStep: React.FC<{
  values: ReturnType<typeof useCheckout>['paymentValues'];
  onFieldChange: ReturnType<typeof useCheckout>['updatePaymentField'];
  errors: Record<string, string>;
}> = ({ values, onFieldChange, errors }) => {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>

      <PaymentMethod
        selected={values.method}
        onChange={(method) => onFieldChange('method', method)}
        cardNumber={values.cardNumber}
        cardHolderName={values.cardHolderName}
        expiryDate={values.expiryDate}
        cvv={values.cvv}
        onCardFieldChange={(field, value) =>
          onFieldChange(field as keyof typeof values, value)
        }
        errors={errors}
      />
    </div>
  );
};

// ---------------------------------------------------------------------------
// Review Step
// ---------------------------------------------------------------------------

const ReviewStep: React.FC<{
  deliveryValues: ReturnType<typeof useCheckout>['deliveryValues'];
  paymentValues: ReturnType<typeof useCheckout>['paymentValues'];
}> = ({ deliveryValues, paymentValues }) => {
  const cart = useCart();

  const paymentLabel =
    paymentValues.method === 'credit_card'
      ? 'Credit Card'
      : paymentValues.method === 'debit_card'
        ? 'Debit Card'
        : paymentValues.method === 'cash_on_delivery'
          ? 'Cash on Delivery'
          : 'Digital Wallet';

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">Review Your Order</h2>

      {/* Delivery info summary */}
      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Delivery Address
        </h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p className="font-medium text-gray-900">{deliveryValues.fullName}</p>
          <p>{deliveryValues.address}</p>
          <p>
            {deliveryValues.city}, {deliveryValues.state}{' '}
            {deliveryValues.zipCode}
          </p>
          <p>{deliveryValues.email}</p>
          <p>{deliveryValues.phone}</p>
          {deliveryValues.deliveryNotes && (
            <p className="mt-2 text-xs text-gray-500 italic">
              Note: {deliveryValues.deliveryNotes}
            </p>
          )}
        </div>
      </div>

      {/* Payment method summary */}
      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Payment Method
        </h3>
        <p className="text-sm text-gray-900 font-medium">{paymentLabel}</p>
        {(paymentValues.method === 'credit_card' ||
          paymentValues.method === 'debit_card') &&
          paymentValues.cardNumber && (
            <p className="text-sm text-gray-500 mt-1">
              Card ending in ****
              {paymentValues.cardNumber.replace(/\s/g, '').slice(-4)}
            </p>
          )}
      </div>

      {/* Order items summary */}
      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Order Items ({cart.itemCount})
        </h3>
        <div className="space-y-2">
          {cart.items.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-gray-600">
                {item.product.name}{' '}
                <span className="text-gray-400">x{item.quantity}</span>
              </span>
              <span className="font-medium text-gray-900">
                {formatCurrency(item.product.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-gray-200 space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">{formatCurrency(cart.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax</span>
            <span className="text-gray-900">{formatCurrency(cart.tax)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Delivery</span>
            <span className="text-gray-900">
              {cart.deliveryFee === 0
                ? 'FREE'
                : formatCurrency(cart.deliveryFee)}
            </span>
          </div>
          {cart.discount > 0 && (
            <div className="flex justify-between text-sm text-emerald-600">
              <span>Discount</span>
              <span>-{formatCurrency(cart.discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-200">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900">{formatCurrency(cart.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main CheckoutForm
// ---------------------------------------------------------------------------

export const CheckoutForm: React.FC = () => {
  const navigate = useNavigate();

  const {
    step,
    deliveryValues,
    paymentValues,
    updateDeliveryField,
    updatePaymentField,
    nextStep,
    prevStep,
    errors,
    isSubmitting,
    submitOrder,
    orderResult,
  } = useCheckout();

  // If the order is complete, redirect to the success page
  React.useEffect(() => {
    if (step === 'complete' && orderResult) {
      navigate('/checkout/success', {
        state: {
          orderId: orderResult.orderId,
          estimatedDelivery: orderResult.estimatedDelivery,
        },
      });
    }
  }, [step, orderResult, navigate]);

  const handlePlaceOrder = async () => {
    await submitOrder();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Step indicator */}
      <StepIndicator currentStep={step} />

      {/* Form content */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {step === 'delivery' && (
          <DeliveryStep
            values={deliveryValues}
            onFieldChange={updateDeliveryField}
            errors={errors}
          />
        )}

        {step === 'payment' && (
          <PaymentStep
            values={paymentValues}
            onFieldChange={updatePaymentField}
            errors={errors}
          />
        )}

        {step === 'review' && (
          <ReviewStep
            deliveryValues={deliveryValues}
            paymentValues={paymentValues}
          />
        )}

        {/* Submit error message */}
        {errors.submit && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{errors.submit}</p>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          {step !== 'delivery' ? (
            <button
              type="button"
              onClick={prevStep}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back
            </button>
          ) : (
            <div />
          )}

          {step !== 'review' ? (
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className={cn(
                'inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold text-white rounded-lg transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500',
                isSubmitting
                  ? 'bg-emerald-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700',
              )}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Placing Order...
                </>
              ) : (
                <>
                  Place Order
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
