import { Implementation } from '../../infrastructure/implementations'

import type { ImplLogic, Response } from '../../domain'

export class RecordPreExists<T> {
  private readonly _repository: Pick<ImplLogic.GeneralRepositoryMethods<T>, 'recordPreExists'>

  constructor(implementation: Pick<ImplLogic.GeneralRepositoryMethods<T>, 'recordPreExists'>) {
    this._repository = implementation
  }

  async invoke(input: T): Promise<Response.ApplicationGeneral> {
    const recordPreExists = await this._repository.recordPreExists(input)

    return recordPreExists
      ? new Implementation.BusinessRulesResponses.RecordPreExists().found()
      : new Implementation.BusinessRulesResponses.RecordPreExists().notFound()
  }
}
