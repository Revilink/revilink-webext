/**
 * @function encodeBase64 Encode base64
 * @param {string} value Value
 * @returns {string} Base64 encoded value
 */
export function encodeBase64(value: string) {
  return btoa(value)
}

/**
 * @function isBase64 Check base64
 * @param {string} value Value
 * @returns {boolean} Base64 or not
 */
export function isBase64(value: string) {
  const base64Regex = /^(?:[A-Z0-9+/]{4})*(?:[A-Z0-9+/]{2}==|[A-Z0-9+/]{3}=)?$/i

  return base64Regex.test(value)
}

/**
 * @function decodeBase64 Decode base64
 * @param {string} value Value
 * @returns {string} Base64 decoded value
 */
export function decodeBase64(value: string) {
  return atob(value)
}
