import { formatPhoneNumber, isValidPhoneNumber } from './phoneNumber'

describe('formatPhoneNumber', () => {
  describe('US phone numbers', () => {
    it('formats 10-digit phone number', () => {
      expect(formatPhoneNumber('2125551234')).toBe('(212) 555-1234')
      expect(formatPhoneNumber('2125551234', 'US')).toBe('(212) 555-1234')
    })

    it('formats phone number with formatting characters', () => {
      expect(formatPhoneNumber('415-555-1234')).toBe('(415) 555-1234')
      expect(formatPhoneNumber('(202) 555-1234')).toBe('(202) 555-1234')
      expect(formatPhoneNumber('310.555.1234')).toBe('(310) 555-1234')
    })

    it('formats 11-digit phone number with country code (removes leading 1)', () => {
      expect(formatPhoneNumber('12125551234')).toBe('(212) 555-1234')
      expect(formatPhoneNumber('1-415-555-1234', 'US')).toBe('(415) 555-1234')
      expect(formatPhoneNumber('12025551234', 'US')).toBe('(202) 555-1234')
      expect(formatPhoneNumber('15555555555', 'US')).toBe('(555) 555-5555')
    })
  })

  describe('extensions', () => {
    it('formats 4-digit extension', () => {
      expect(formatPhoneNumber('1234', 'extension')).toBe('1234')
      expect(formatPhoneNumber('1-2-3-4', 'extension')).toBe('1234')
    })

    it('returns null for invalid extension', () => {
      expect(formatPhoneNumber('123', 'extension')).toBe(null)
      expect(formatPhoneNumber('12345', 'extension')).toBe(null)
    })
  })

  describe('international phone numbers', () => {
    it('returns international numbers as-is', () => {
      expect(formatPhoneNumber('+44 20 7946 0958', 'international')).toBe('+44 20 7946 0958')
      expect(formatPhoneNumber('+1-800-555-1234', 'international')).toBe('+1-800-555-1234')
    })
  })

  describe('edge cases', () => {
    it('returns null for invalid phone numbers', () => {
      expect(formatPhoneNumber('123')).toBe(null)
      expect(formatPhoneNumber('abc')).toBe(null)
      expect(formatPhoneNumber('')).toBe(null)
    })

    it('handles null and undefined', () => {
      expect(formatPhoneNumber(null)).toBe(null)
      expect(formatPhoneNumber(undefined)).toBe(null)
    })

    it('defaults to US type', () => {
      expect(formatPhoneNumber('2125551234')).toBe('(212) 555-1234')
    })
  })
})

describe('isValidPhoneNumber', () => {
  it('validates US phone numbers', () => {
    expect(isValidPhoneNumber('2125551234')).toBe(true)
    expect(isValidPhoneNumber('12125551234')).toBe(true)
    expect(isValidPhoneNumber('415-555-1234')).toBe(true)
    expect(isValidPhoneNumber('123')).toBe(false)
    expect(isValidPhoneNumber('abc')).toBe(false)
  })

  it('validates extensions', () => {
    expect(isValidPhoneNumber('1234', 'extension')).toBe(true)
    expect(isValidPhoneNumber('123', 'extension')).toBe(false)
    expect(isValidPhoneNumber('12345', 'extension')).toBe(false)
  })

  it('validates international numbers', () => {
    expect(isValidPhoneNumber('+44 20 7946 0958', 'international')).toBe(true)
    expect(isValidPhoneNumber('', 'international')).toBe(false)
  })
})

