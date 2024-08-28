import { type ImplLogic } from 'core/domain'

import { type Interfaces } from '../../../domain'

/**
 * This is the contract that is going to be signed off in the infrastructure
 * layer in order to provide a valid implementation of the 'User' Entity
 * to the required resource
 */
export type CrudRepository = ImplLogic.Crud<Interfaces.User> & Pick<ImplLogic.GeneralRepositoryMethods<string>, 'recordPreExists'>
