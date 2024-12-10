type InputMask = {
  format: (value: string) => string
  pattern: string
  placeholder: string
}

type InputMaskDictionary = {
  [key in 'currency' | 'zipCode' | 'postalCode' | 'ssn']: InputMask
}

// Currency formatting helpers
const formatCurrency = (value: string): string => {
  const numericValue = value.replace(/[^0-9]/g, '').slice(0, 15)
  
  if (!numericValue) return ''
  
  const dollars = parseFloat((parseInt(numericValue) / 100).toFixed(2))
  if (dollars === 0) return ''
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(dollars)
}

// Postal code formatting helpers
const formatBasicPostal = (value: string): string => {
  return value.replace(/\D/g, '').slice(0, 5)
}

const formatExtendedPostal = (value: string): string => {
  const cleaned = value.replace(/\D/g, '').slice(0, 9)
  return cleaned.replace(/(\d{5})(?=\d)/, '$1-')
}

// SSN formatting helper
const formatSSN = (value: string): string => {
  const cleaned = value.replace(/\D/g, '').slice(0, 9)
  return cleaned
    .replace(/(\d{3})(?=\d)/, '$1-')
    .replace(/(\d{5})(?=\d)/, '$1-')
}

export const INPUTMASKS: InputMaskDictionary = {
  currency: {
    format: formatCurrency,
    pattern: '^\\$\\d{1,3}(?:,\\d{3})*(?:\\.\\d{2})?$',
    placeholder: '$0.00',
  },
  zipCode: {
    format: formatBasicPostal,
    pattern: '\\d{5}',
    placeholder: '12345',
  },
  postalCode: {
    format: formatExtendedPostal,
    pattern: '\\d{5}-\\d{4}',
    placeholder: '12345-6789',
  },
  ssn: {
    format: formatSSN,
    pattern: '\\d{3}-\\d{2}-\\d{4}',
    placeholder: '123-45-6789',
  },
} 