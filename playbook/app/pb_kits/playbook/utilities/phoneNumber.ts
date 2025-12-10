/**
 * Phone Number Formatter Utility
 * 
 * Formats phone numbers according to Playbook standards.
 * This utility can be imported and used in any kit that needs to display phone numbers.
 * 
 * @example
 * import { formatPhoneNumber } from '../utilities/phoneNumber'
 * 
 * <Body text={formatPhoneNumber('2125551234')} />
 */

export type PhoneNumberType = 
  | 'US' 
  | 'extension' 
  | 'international'

/**
 * Formats a phone number string according to Playbook standards
 * 
 * @param phoneNumber - The raw phone number string (can include formatting characters)
 * @param type - The type of phone number: 'US' (default), 'extension', or 'international'
 * @returns Formatted phone number string, or null if formatting fails
 * 
 * @example
 * formatPhoneNumber('2125551234') // Returns: '(212) 555-1234'
 * formatPhoneNumber('12125551234', 'US') // Returns: '(212) 555-1234' (leading 1 removed)
 * formatPhoneNumber('1234', 'extension') // Returns: '1234' (if 4 digits)
 * formatPhoneNumber('+44 20 7946 0958', 'international') // Returns: '+44 20 7946 0958' (unchanged)
 */
export const formatPhoneNumber = (
  phoneNumber: string,
  type: PhoneNumberType = 'US'
): string | null => {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return null
  }

  // International phone numbers are returned as-is
  if (type === 'international') {
    return phoneNumber
  }

  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '')

  // Handle extensions (4-digit numbers)
  if (type === 'extension') {
    const extensionMatch = cleaned.match(/^\d{4}$/)
    return extensionMatch ? extensionMatch[0] : null
  }

  // Format US phone numbers: (XXX) XXX-XXXX
  // Remove leading 1 if present and number is 11 digits (US country code)
  let cleanedNumber = cleaned
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    cleanedNumber = cleaned.substring(1)
  }
  
  const phoneMatch = cleanedNumber.match(/^(\d{3})(\d{3})(\d{4})$/)

  if (phoneMatch) {
    return [
      '(',
      phoneMatch[1],
      ') ',
      phoneMatch[2],
      '-',
      phoneMatch[3],
    ].join('')
  }

  // If no match, return null (could be invalid or international format)
  return null
}

/**
 * Checks if a phone number is valid for formatting
 * 
 * @param phoneNumber - The phone number string to validate
 * @param type - The type of phone number
 * @returns true if the phone number can be formatted, false otherwise
 */
export const isValidPhoneNumber = (
  phoneNumber: string,
  type: PhoneNumberType = 'US'
): boolean => {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return false
  }

  if (type === 'international') {
    return phoneNumber.length > 0
  }

  if (type === 'extension') {
    const cleaned = phoneNumber.replace(/\D/g, '')
    return /^\d{4}$/.test(cleaned)
  }

  const cleaned = phoneNumber.replace(/\D/g, '')
  return /^(1|)?\d{10}$/.test(cleaned)
}

