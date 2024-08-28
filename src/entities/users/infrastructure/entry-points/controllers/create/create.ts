import { Implementation as CoreImplementation } from 'core/infrastructure/implementations'
import { Enum } from 'core/domain'

import { Implementation } from '../../../../infrastructure/implementations'
import { UseCase } from '../../../../application/use-cases'

import type { Request, Response } from 'express'

export async function create(req: Request, res: Response): Promise<void> {
  const { Repository, UserValidation, Responses } = Implementation
  const { Create } = UseCase

  try {
    const useCaseCreateUser = await new Create(
      new Repository.Crud(),
      new UserValidation(),
      new Responses.CrudResponses()
    ).invoke(req.body)

    res.status(useCaseCreateUser.httpStatusCode).json({ data: useCaseCreateUser.data })
  } catch (error) {
    CoreImplementation.Util.AppResponseLog.exception(
      `An unhanlded error has occurred when creating the user. Details: ${error as string}`
    )

    res.status(Enum.SERVER_ERROR_HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      data: {
        message: `An unhanlded error has occurred when creating the user. Details: ${error as string
          }`
      }
    })
  }
}
