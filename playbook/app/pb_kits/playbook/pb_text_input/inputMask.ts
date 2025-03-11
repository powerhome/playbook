type InputMask = {
    format: (value: string) => string
    formatDefaultValue: (value: string) => string
    pattern: string
    placeholder: string
}

type InputMaskDictionary = {
    [key in 'currency' | 'zipCode' | 'postalCode' | 'ssn' | 'creditCard' | 'cvv']: InputMask
}

const formatCurrencyDefaultValue = (value: string): string => {
    // Remove non-numeric characters except for the decimal point
    const numericValue = value.replace(/[^0-9.]/g, '')

    if (!numericValue) return ''

    // Parse the numeric value as a float to handle decimals
    const dollars = parseFloat(numericValue)
    if (isNaN(dollars)) return ''

    // Format as currency
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
    }).format(dollars)
}

const formatCurrency = (value: string): string => {
    const numericValue = value.replace(/[^0-9]/g, '').slice(0, 15)

    if (!numericValue || numericValue === "00") return ''

    const dollars = parseFloat((parseInt(numericValue) / 100).toFixed(2))

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
    }).format(dollars)
}

const formatBasicPostal = (value: string): string => {
    return value.replace(/\D/g, '').slice(0, 5)
}

const formatExtendedPostal = (value: string): string => {
    const cleaned = value.replace(/\D/g, '').slice(0, 9)
    return cleaned.replace(/(\d{5})(?=\d)/, '$1-')
}

const formatSSN = (value: string): string => {
    const cleaned = value.replace(/\D/g, '').slice(0, 9)
    return cleaned
        .replace(/(\d{5})(?=\d)/, '$1-')
        .replace(/(\d{3})(?=\d)/, '$1-')
}

const formatCreditCard = (value: string): string => {
    const cleaned = value.replace(/\D/g, '').slice(0, 16)
    return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ')
}

const formatCVV = (value: string): string => {
    return value.replace(/\D/g, '').slice(0, 4)
}

export const INPUTMASKS: InputMaskDictionary = {
    currency: {
        format: formatCurrency,
        formatDefaultValue: formatCurrencyDefaultValue,
        // eslint-disable-next-line no-useless-escape
        pattern: '^\\$\\d{1,3}(?:,\\d{3})*(?:\\.\\d{2})?$',
        placeholder: '$0.00',
    },
    zipCode: {
        format: formatBasicPostal,
        formatDefaultValue: formatBasicPostal,
        pattern: '\\d{5}',
        placeholder: '12345',
    },
    postalCode: {
        format: formatExtendedPostal,
        formatDefaultValue: formatExtendedPostal,
        pattern: '\\d{5}-\\d{4}',
        placeholder: '12345-6789',
    },
    ssn: {
        format: formatSSN,
        formatDefaultValue: formatSSN,
        pattern: '\\d{3}-\\d{2}-\\d{4}',
        placeholder: '123-45-6789',
    },
    creditCard: {
        format: formatCreditCard,
        formatDefaultValue: formatCreditCard,
        pattern: '\\d{4} \\d{4} \\d{4} \\d{4}',
        placeholder: '1234 5678 9012 3456',
    },
    cvv: {
        format: formatCVV,
        formatDefaultValue: formatCVV,
        pattern: '\\d{3,4}',
        placeholder: '123',
    },
} 
