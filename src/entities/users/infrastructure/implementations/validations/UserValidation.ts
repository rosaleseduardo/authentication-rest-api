import { Implementation } from 'core/infrastructure/implementations'

import type { ImplLogic } from '../../../domain'

export class UserValidation implements ImplLogic.CrudValidation {
  isValidEmail(email: string): boolean {
    return Implementation.Util.isValidEmail(email)
  }

  isValidPassword(password: string): boolean {
    return password !== ''
  }

  areEqual(valueOne: string[], valueTwo: string[]): boolean {
    return Implementation.Util.isEqual(valueOne, valueTwo)
  }
}
