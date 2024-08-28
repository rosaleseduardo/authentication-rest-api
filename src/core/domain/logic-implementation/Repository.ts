/**
 * This is the contract that is going to be signed off in the infrastructure
 * layer in order to provide a valid implementation of the 'GeneralValidation'
 * to the required resource
 */
export interface GeneralRepositoryMethods<T> {
  recordPreExists: (input: T) => Promise<boolean>
}
