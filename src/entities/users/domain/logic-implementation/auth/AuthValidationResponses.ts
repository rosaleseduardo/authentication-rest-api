import type { ImplLogic } from 'core/domain'

/**
 * This is the contract that is going to be signed off in the infrastructure
 * layer in order to provide a valid implementation of 'Auth Validation Responses'
 * to the required resource
 */
export interface AuthValidationResponses
  extends ImplLogic.GeneralInternalValidationResponses,
  ImplLogic.GeneralAppValidationResponses {
  invalidEmail: (email: string) => boolean
  invalidPassword: (password: string) => boolean
}
