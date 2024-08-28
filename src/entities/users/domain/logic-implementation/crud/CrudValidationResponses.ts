import type { ImplLogic } from 'core/domain'

/**
 * This is the contract that is going to be signed off in the infrastructure
 * layer in order to provide a valid implementation of 'CRUD Validations Responses'
 * to the required resource
 */
export interface CrudValidationResponses
  extends ImplLogic.GeneralInternalValidationResponses,
  ImplLogic.GeneralAppValidationResponses {
  invalidEmail: (email: string) => boolean
  invalidPassword: (password: string) => boolean
  invalidName: (name: string) => boolean
  invalidAge: (age: number) => boolean
}
