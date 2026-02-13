const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;
const ZIP_CODE_REGEX = /^\d{5}(-\d{4})?$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  return PHONE_REGEX.test(value.replace(/[\s()-]/g, ''));
}

export function isPositiveNumber(value: number): boolean {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

export function isNonEmptyString(value: string): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

export function isValidZipCode(value: string): boolean {
  return ZIP_CODE_REGEX.test(value.trim());
}
