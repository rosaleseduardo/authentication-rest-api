import type { Interfaces, ImplLogic } from '../../../../domain'
import type { Response } from 'core/domain'

export class CreateDataIsValid {
  private readonly _user: Interfaces.User
  private readonly _crudValidationImpl: ImplLogic.CrudValidation
  private readonly _crudValidationResponsesImpl: ImplLogic.CrudResponses

  constructor(
    user: Interfaces.User,
    crudValidationImpl: ImplLogic.CrudValidation,
    crudValidationResponsesImpl: ImplLogic.CrudResponses
  ) {
    this._user = user
    this._crudValidationImpl = crudValidationImpl
    this._crudValidationResponsesImpl = crudValidationResponsesImpl
  }

  propertiesWereProvided(): boolean {
    const sampleUser: Interfaces.User = {
      email: '',
      password: '',
      name: '',
      age: 0
    }

    if (!this._crudValidationImpl.areEqual(Object.keys(this._user), Object.keys(sampleUser))) {
      return this._crudValidationResponsesImpl.incompleteInputData()
    }

    return this._crudValidationResponsesImpl.completeInputData()
  }

  propertyValuesAreWellDefined(): boolean {
    if (!this._crudValidationImpl.isValidEmail(this._user.email)) {
      return this._crudValidationResponsesImpl.invalidEmail(this._user.email)
    } else if (!this._crudValidationImpl.isValidPassword(this._user.password)) {
      return this._crudValidationResponsesImpl.invalidPassword(this._user.password)
    } else if (!(typeof this._user.name === 'string')) {
      return this._crudValidationResponsesImpl.invalidName(this._user.name)
    } else if (!(typeof this._user.age === 'number')) {
      return this._crudValidationResponsesImpl.invalidAge(this._user.age)
    }

    return this._crudValidationResponsesImpl.validPropertyValues()
  }

  invoke(): boolean {
    const propertiesValidationPassed = this.propertiesWereProvided()
    const propertyValuesValidationPassed = this.propertyValuesAreWellDefined()

    if (!propertiesValidationPassed || !propertyValuesValidationPassed) {
      return false
    }

    return this._crudValidationResponsesImpl.validInputData()
  }

  failed(): Response.ApplicationFailedOutput {
    return this._crudValidationResponsesImpl.invalidInputData()
  }
}
