import { ExpressServers } from '../../instances'
import { Implementation } from '../../implementations'

import { endpoints } from './router'

export class ApiRest {
  server?: ExpressServers.RestServer

  async start(): Promise<void> {
    const port = process.env.SERVER_PORT as string

    this.server = new ExpressServers.RestServer(port, endpoints)

    try {
      await this.server.listen().then(function () {
        Implementation.Util.AppResponseLog.success('API REST Services are up and running\n\n')
      })
    } catch (error) {
      await this.server.stop()

      Implementation.Util.AppResponseLog.exception(
        `An unhandled error has occured when starting ExpressServer. Details: ${error}`
      )
    }
  }

  async stop(): Promise<void> {
    await this.server?.stop()
  }
}
