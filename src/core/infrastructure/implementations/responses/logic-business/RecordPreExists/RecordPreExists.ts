import { Enum, type Response } from '../../../../../domain'
import { Util } from '../../../utils'

export class RecordPreExists {
  found(): Response.ApplicationGeneral {
    const process = {
      httpStatusCode: Enum.CLIENT_ERROR_HTTP_STATUS_CODE.CONFLICT,
      passed: false,
      message: 'The provided record has previously been registered'
    }

    Util.AppResponseLog.warning(
      'BUSINESS_LOGIC - RECORD_PRE_EXISTS: The provided record has previously been registered'
    )

    return process
  }

  notFound(): Response.ApplicationGeneral {
    const process = {
      httpStatusCode: Enum.SUCCESSFUL_HTTP_STATUS_CODE.OK,
      passed: true,
      message: `BUSINESS_LOGIC - RECORD_PRE_EXISTS: This record has not been found in
        our records. The process can continue.`
    }

    Util.AppResponseLog.info(process.message)

    return process
  }
}
