// Accepts Moroccan mobile and landline numbers in the usual spellings:
// 0612345678, 06 12 34 56 78, 06.12.34.56.78, +212 6 12 34 56 78,
// +212 (0)6..., 00212612345678.
export function isValidMoroccanPhone(value: string): boolean {
  const compact = value.replace(/[\s.\-()]/g, "");
  return /^(?:(?:\+|00)2120?|0)[5-8]\d{8}$/.test(compact);
}

export function isBlank(value: string): boolean {
  return value.trim().length === 0;
}
