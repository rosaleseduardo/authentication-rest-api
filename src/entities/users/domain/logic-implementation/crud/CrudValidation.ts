/**
 * This is the contract that is going to be signed off in the infrastructure
 * layer in order to provide a valid implementation of 'CRUD Validations' to the
 * required resource
 */
export interface CrudValidation {
  isValidEmail: (email: string) => boolean
  isValidPassword: (email: string) => boolean
  areEqual: (valueOne: string[], valueTwo: string[]) => boolean
}
