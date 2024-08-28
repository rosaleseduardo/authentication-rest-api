import * as dotenv from 'dotenv'
import { ApiRest, ApiGraphql } from 'core/infrastructure/entry-points'
import { Implementation } from 'core/infrastructure/implementations'

try {
  dotenv.config()

  const apiArchitecture = process.env.API_ARCHITECTURE

  if (apiArchitecture === 'rest') {
    void new ApiRest().start()
  } else {
    void new ApiGraphql().start()
  }
} catch (err) {
  Implementation.Util.AppResponseLog.exception(
    `An unhandled error has occured whren starting ApiRestServices. Details: ${err}`
  )
}
