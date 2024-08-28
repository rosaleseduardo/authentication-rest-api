import { BusinessLogic as CoreBusinessLogic, type Response as CoreResponse } from 'core/domain'
import { Adapter as CoreAdapter } from 'core/application/adapters'
import { type Response } from 'express'

import {
  type Interfaces,
  type ImplLogic,
  BusinessLogic as UserBusinessLogic
} from '../../../domain'

export class Authenticate {
  private readonly _repository: ImplLogic.CrudRepository
  private readonly _tokenHelper: ImplLogic.TokenGenerator
  private readonly _validationCriteria: ImplLogic.AuthValidation
  private readonly _responses: ImplLogic.AuthResponses
  private readonly _httpResponse: Response

  constructor(
    repository: ImplLogic.CrudRepository,
    tokenHelper: ImplLogic.TokenGenerator,
    validationCriteria: ImplLogic.AuthValidation,
    responses: ImplLogic.AuthResponses,
    httpResponse: Response
  ) {
    this._repository = repository
    this._tokenHelper = tokenHelper
    this._validationCriteria = validationCriteria
    this._responses = responses
    this._httpResponse = httpResponse
  }

  async invoke(
    credentials: Interfaces.AuthCredentials
  ): Promise<
    | CoreResponse.DataSourceOutput<Interfaces.User>
    | CoreResponse.ApplicationFailedOutput
  > {
    const INCOMING_USER_DATA_IS_VALID = new UserBusinessLogic.CredentialsAreValid(
      credentials,
      this._validationCriteria,
      this._responses
    )

    if (INCOMING_USER_DATA_IS_VALID.invoke()) {
      const recordPreExists = await new CoreBusinessLogic.RecordPreExists<string>(
        this._repository
      ).invoke(credentials.email)

      if (!recordPreExists.passed) {
        try {
          const tokens = this._tokenHelper.generateTokens(credentials.email)

          const user = await this._repository.get('email', credentials.email)

          await this._repository.update({
            criteria: { email: credentials.email },
            data: { ...user, refreshToken: tokens.refreshToken }
          })

          /**
           * This will always be sent with every request
           *
           * @remarks
           *  - If we set the cookie as HTTP ONLY is won't be accessible to JS
           *  - Max Age equals 'a day'. It is expressed in ms
           *
           * NOTE: While it is not 100% secure is more secure than storing your
           * refreshToken in the LocaStorage or in another cookie that is available
           * to JS
           */
          this._httpResponse.cookie('jwt', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
          })

          return this._responses.authenticationSucceeded({
            accessToken: tokens.accessToken
          })
        } catch (error) {
          return new CoreAdapter.UnhandledErrorResponse(
            'AuthenticateUseCase',
            error as string
          ).invoke()
        }
      }

      return this._responses.authenticationFailed()
    }

    return INCOMING_USER_DATA_IS_VALID.failed()
  }
}
