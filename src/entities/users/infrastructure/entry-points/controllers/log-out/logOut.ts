import { Implementation as CoreImplementation } from 'core/infrastructure/implementations'
import { Enum } from 'core/domain'

import { Implementation } from '../../../../infrastructure/implementations'
import { UseCase } from '../../../../application/use-cases'

import type { Request, Response } from 'express'

export async function logOut(req: Request, res: Response): Promise<void> {
    const { Repository, Responses } = Implementation
    const { LogOut } = UseCase

    try {
        const useCaseRefreshToken = await new LogOut(
            new Repository.Crud(),
            new Responses.AuthResponses(),
            req,
            res
        ).invoke()

        res.status(useCaseRefreshToken.httpStatusCode).json({ data: useCaseRefreshToken.data })
    } catch (error) {
        CoreImplementation.Util.AppResponseLog.exception(
            `An unhandled error has occurred when logging out.
             Details: ${error as string}`
        )

        res.status(Enum.SERVER_ERROR_HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            data: {
                message: `An unhandled error has occurred when loggin out.
                Details: ${error as string}`
            }
        })
    }
}
