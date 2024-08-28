import { type Response as CoreResponse } from 'core/domain'
import { Adapter as CoreAdapter } from 'core/application/adapters'

import { type ImplLogic } from '../../../domain'

import type { Request, Response } from 'express'

export class LogOut {
    private readonly _repository: ImplLogic.CrudRepository
    private readonly _responses: ImplLogic.AuthResponses
    private readonly _httpRequest: Request
    private readonly _httpResponse: Response

    constructor(
        repository: ImplLogic.CrudRepository,
        responses: ImplLogic.AuthResponses,
        httpRequest: Request,
        httpResponse: Response
    ) {
        this._repository = repository
        this._responses = responses
        this._httpRequest = httpRequest
        this._httpResponse = httpResponse
    }

    async invoke(): Promise<CoreResponse.DataSourceOutput<string> | CoreResponse.ApplicationFailedOutput> {
        try {
            const cookies = this._httpRequest.cookies

            if (cookies) {
                const refreshToken = cookies.jwt

                const user = await this._repository.get('refreshToken', refreshToken)
                if (user) {
                    await this._repository.update({
                        criteria: { refreshToken },
                        data: { ...user, refreshToken: '' }
                    })

                    this._httpResponse.clearCookie('jwt', {
                        httpOnly: true,

                        /**
                         * Restrict access to cookies
                         *
                         * https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies
                         */
                        secure: process.env.NODE_ENV === 'production'
                    })

                    return this._responses.logOutSucceeded()
                }

                this._httpResponse.clearCookie('jwt', {
                    httpOnly: true,
                    /**
                     * Restrict access to cookies
                     *
                     * https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies
                    */
                    secure: process.env.NODE_ENV === 'production'
                })

                return this._responses.logOutSucceeded()
            }

            return this._responses.logOutSucceeded()
        } catch (error) {
            return new CoreAdapter.UnhandledErrorResponse(
                'LogOutUseCase',
                error as string
            ).invoke()
        }
    }
}
