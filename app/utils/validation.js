export function isEmail(value) {
  return value.includes('@');
}

export function isNotEmpty(value) {
  return value.trim() !== '';
}

export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}

export function isEqualsToOtherValue(value, otherValue) {
  return value === otherValue;
}

export function isValidPhoneNumber(phone) {
  const phoneRegex = /^[0-9]{10,15}$/; // Only numbers, length between 10 and 15
  return phoneRegex.test(phone);
}
