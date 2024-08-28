import { isValidEmail } from '.'

describe('isValidEmail', () => {
  it('should return true for valid email addresses', () => {
    expect(isValidEmail('test@example.com')).toBe(true)
    expect(isValidEmail('john.doe@example.co.uk')).toBe(true)
    expect(isValidEmail('user123_456@example.net')).toBe(true)
  })

  it('should return false for invalid email addresses', () => {
    expect(isValidEmail('invalidemail')).toBe(false)
    expect(isValidEmail('test@example')).toBe(false)
    expect(isValidEmail('@example.com')).toBe(false)
    expect(isValidEmail('test@.com')).toBe(false)
  })
})
