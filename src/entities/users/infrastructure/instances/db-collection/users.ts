import { mongodb } from 'core/infrastructure/instances'

import { type Interfaces } from '../../../domain'

export const Collection = mongodb.collection<Interfaces.User>('users')
