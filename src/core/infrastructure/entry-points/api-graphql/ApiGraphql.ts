import { ApolloServer } from '@apollo/server'

import { ExpressServers } from '../../instances'
import { Implementation } from '../../implementations'

import typeDefs from './typeDefs'
import resolvers from './resolvers'

export class ApiGraphql {
    server?: ExpressServers.GraphqlServer

    async start(): Promise<void> {
        const port = process.env.SERVER_PORT as string

        const server = new ApolloServer({ typeDefs, resolvers })
        await server.start()

        this.server = new ExpressServers.GraphqlServer(port, server)

        try {
            await this.server.listen().then(function () {
                Implementation.Util.AppResponseLog.success('API Graphql is up and running\n\n')
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
