import type { Interfaces, ImplLogic } from '../../../domain'
import type { Response } from 'core/domain'

/**
 * This is the contract that is going to be signed off in the infrastructure
 * layer in order to provide a valid implementation of 'CRUD Responses' to the
 * required resource
 */
export interface AuthResponses extends ImplLogic.AuthValidationResponses {
  authenticationSucceeded: (
    dataSource: Pick<Interfaces.Tokens, 'accessToken'>,
  ) => Response.DataSourceOutput<Pick<Interfaces.Tokens, 'accessToken'>>
  tokenValidationSucceeded: (
    dataSource: Omit<Interfaces.Tokens, 'refreshToken'>,
  ) => Response.DataSourceOutput<Pick<Interfaces.Tokens, 'accessToken'>>
  logOutSucceeded: () => Response.DataSourceOutput<string>
  authenticationFailed: () => Response.ApplicationFailedOutput
  tokenValidationFailed: (message: string) => Response.ApplicationFailedOutput
  logOutFailed: (message: string) => Response.ApplicationFailedOutput
}
