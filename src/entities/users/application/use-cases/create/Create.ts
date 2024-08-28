import { type Response, BusinessLogic as CoreBusinessLogic } from 'core/domain'
import { Adapter as CoreAdapter } from 'core/application/adapters'

import { Adapter as UserAdapter } from '../../../application/adapters'
import {
  type ImplLogic,
  type Interfaces,
  BusinessLogic as UserBusinessLogic
} from '../../../domain'

export class Create {
  private readonly _repository: ImplLogic.CrudRepository
  private readonly _validationCriteria: ImplLogic.CrudValidation
  private readonly _responses: ImplLogic.CrudResponses

  constructor(
    repository: ImplLogic.CrudRepository,
    validationCriteria: ImplLogic.CrudValidation,
    responses: ImplLogic.CrudResponses
  ) {
    this._repository = repository
    this._validationCriteria = validationCriteria
    this._responses = responses
  }

  async invoke(
    user: Interfaces.User
  ): Promise<
    | Response.DataSourceOutput<Interfaces.User>
    | Response.ApplicationFailedOutput
  > {
    const INCOMING_USER_DATA_IS_VALID = new UserBusinessLogic.CreateDataIsValid(
      user,
      this._validationCriteria,
      this._responses
    )

    if (INCOMING_USER_DATA_IS_VALID.invoke()) {
      const recordPreExists = await new CoreBusinessLogic.RecordPreExists<string>(
        this._repository
      ).invoke(user.email)

      if (recordPreExists.passed) {
        try {
          await this._repository.save(user)

          return this._responses.creationSucceeded(UserAdapter.refineUserEntity(user))
        } catch (error) {
          return new CoreAdapter.UnhandledErrorResponse('CreateUserUseCase', error as string).invoke()
        }
      }

      return this._responses.creationFailed()
    }

    return INCOMING_USER_DATA_IS_VALID.failed()
  }
}
