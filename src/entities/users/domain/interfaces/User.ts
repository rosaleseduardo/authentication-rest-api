import { type AuthCredentials } from './AuthCredentials'
import { type UniqueFields } from './UniqueFields'

export interface User extends AuthCredentials, Partial<UniqueFields> {
  name: string
  age: number
}
