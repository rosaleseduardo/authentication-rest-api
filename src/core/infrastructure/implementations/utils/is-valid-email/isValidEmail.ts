/**
 * Regular expression for validating the format of an email address.
 */
const emailFormat = /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

/**
 * Validates the format of an email address using a regular expression.
 *
 * @param email - The email address to be validated.
 *
 * @returns `true` if the email address is in a valid format, `false` otherwise.
 */
export function isValidEmail(email: string): boolean {
  return emailFormat.test(email)
}
