/**
 * This is the contract that is going to be signed off in the infrastructure
 * layer in order to provide a valid implementation of 'Auth Validation' to the
 * required resource
 */
export interface AuthValidation {
  isValidEmail: (email: string) => boolean
  isValidPassword: (password: string) => boolean
  areEqual: (valueOne: string[], valueTwo: string[]) => boolean
}
