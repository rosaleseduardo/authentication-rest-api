import { type Response as CoreResponse } from 'core/domain'
import { Adapter as CoreAdapter } from 'core/application/adapters'
import { type Request } from 'express'

import { type Interfaces, type ImplLogic } from '../../../domain'

export class RefreshToken {
  private readonly _repository: ImplLogic.CrudRepository
  private readonly _tokenHelper: ImplLogic.TokenGenerator
  private readonly _responses: ImplLogic.AuthResponses
  private readonly _httpRequest: Request

  constructor(
    repository: ImplLogic.CrudRepository,
    tokenHelper: ImplLogic.TokenGenerator,
    responses: ImplLogic.AuthResponses,
    httpRequest: Request
  ) {
    this._repository = repository
    this._tokenHelper = tokenHelper
    this._responses = responses
    this._httpRequest = httpRequest
  }

  async invoke(): Promise<CoreResponse.DataSourceOutput<Interfaces.User> | CoreResponse.ApplicationFailedOutput> {
    try {
      const cookies = this._httpRequest.cookies

      if (cookies) {
        const refreshToken = cookies.jwt

        const user = await this._repository.get('refreshToken', refreshToken)

        if (user) {
          return this._tokenHelper.verifyToken(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET as string,
            (err: { message: string }, decoded: string) => {
              if (err) {
                // Token verification failed
                return this._responses.tokenValidationFailed(err.message)
              } else {
                // Token is valid, and `decoded` contains the decoded payload
                const accessToken = this._tokenHelper.generateAccessToken('username')
                return this._responses.tokenValidationSucceeded({ accessToken, decoded })
              }
            })
        }

        return this._responses.authenticationFailed()
      }

      return this._responses.authenticationFailed()
    } catch (error) {
      return new CoreAdapter.UnhandledErrorResponse(
        'RefreshTokenUseCase',
        error as string
      ).invoke()
    }
  }
}
