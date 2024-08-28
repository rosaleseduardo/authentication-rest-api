import { type Response } from 'core/domain'

import type { ImplLogic, Interfaces } from '../../../../domain'

export class CredentialsAreValid {
  private readonly _credentials: Interfaces.AuthCredentials
  private readonly _authValidationImpl: ImplLogic.AuthValidation
  private readonly _authValidationResponsesImpl: ImplLogic.AuthValidationResponses

  constructor(
    credentials: Interfaces.AuthCredentials,
    authValidationImpl: ImplLogic.AuthValidation,
    authValidationResponsesImpl: ImplLogic.AuthValidationResponses
  ) {
    this._credentials = credentials
    this._authValidationImpl = authValidationImpl
    this._authValidationResponsesImpl = authValidationResponsesImpl
  }

  propertiesWereProvided(): boolean {
    const sampleRecord: Interfaces.AuthCredentials = {
      email: '',
      password: ''
    }

    if (
      !this._authValidationImpl.areEqual(Object.keys(this._credentials), Object.keys(sampleRecord))
    ) {
      return this._authValidationResponsesImpl.incompleteInputData()
    }

    return this._authValidationResponsesImpl.completeInputData()
  }

  propertyValuesAreWellDefined(): boolean {
    if (!this._authValidationImpl.isValidEmail(this._credentials.email)) {
      return this._authValidationResponsesImpl.invalidEmail(this._credentials.email)
    } else if (!this._authValidationImpl.isValidPassword(this._credentials.password)) {
      return this._authValidationResponsesImpl.invalidPassword(this._credentials.password)
    }

    return this._authValidationResponsesImpl.validPropertyValues()
  }

  invoke(): boolean {
    const propertiesValidationPassed = this.propertiesWereProvided()
    const propertyValuesValidationPassed = this.propertyValuesAreWellDefined()

    if (!propertiesValidationPassed || !propertyValuesValidationPassed) {
      return false
    }

    return this._authValidationResponsesImpl.validInputData()
  }

  failed(): Response.ApplicationFailedOutput {
    return this._authValidationResponsesImpl.invalidInputData()
  }
}
