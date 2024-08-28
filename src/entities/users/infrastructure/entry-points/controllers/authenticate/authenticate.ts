import { Implementation as CoreImplementation } from 'core/infrastructure/implementations'
import { Enum } from 'core/domain'

import { UseCase } from '../../../../application/use-cases'
import { Implementation } from '../../../../infrastructure/implementations'

import type { Request, Response } from 'express'

export async function authenticate(req: Request, res: Response): Promise<void> {
  const { Repository, Helpers, UserValidation, Responses } = Implementation
  const { Authenticate } = UseCase

  try {
    const useCaseAuthUser = await new Authenticate(
      new Repository.Crud(),
      new Helpers.TokenGenerator(),
      new UserValidation(),
      new Responses.AuthResponses(),
      res
    ).invoke(req.body)

    res.status(useCaseAuthUser.httpStatusCode).json({ data: useCaseAuthUser.data })
  } catch (error) {
    CoreImplementation.Util.AppResponseLog.exception(
      `An unhandled error has occurred when authenticating the user.
       Details: ${error as string}`
    )

    res.status(Enum.SERVER_ERROR_HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      data: {
        message: `An unhandled error has occurred when authenticating the user.
          Details: ${error as string}`
      }
    })
  }
}
