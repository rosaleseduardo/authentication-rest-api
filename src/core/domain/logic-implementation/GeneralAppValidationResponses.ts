import { type Response } from '../../domain'

/**
 * This is the contract that is going to be signed off in the infrastructure
 * layer in order to provide a valid implementation of 'General Validation Responses'
 * to the required resource
 */
export interface GeneralAppValidationResponses {
  invalidInputData: () => Response.ApplicationFailedOutput
}
