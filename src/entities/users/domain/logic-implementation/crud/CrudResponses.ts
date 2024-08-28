import type { Interfaces, ImplLogic } from '../../../domain'
import type { Response } from 'core/domain'

/**
 * This is the contract that is going to be signed off in the infrastructure
 * layer in order to provide a valid implementation of 'CRUD Responses' to the
 * required resource
 */
export interface CrudResponses extends ImplLogic.CrudValidationResponses {
  creationSucceeded: (
    dataSource: Omit<Interfaces.User, 'password'>,
  ) => Response.DataSourceOutput<Omit<Interfaces.User, 'password'>>
  creationFailed: () => Response.ApplicationFailedOutput
}
