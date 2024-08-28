import express from 'express'
import cookieParser from 'cookie-parser'
import { expressMiddleware } from '@apollo/server/express4'

import { Middlewares } from '../../../entry-points'
import { Implementation } from '../../../implementations'

import type * as http from 'http'

export class GraphqlServer {
  private readonly _port: string
  private readonly _app: express.Express
  private _httpServer?: http.Server

  constructor(port: string, server: any) {
    this._port = port
    this._app = express()
    this._app.use(Middlewares.cors)
    this._app.use(Middlewares.morgan)
    /**
     * Usage of helmet in default configuration blocks graphql playground to open
     *
     * @see {@link https://stackoverflow.com/questions/66614351/usage-of-helmet-in-default-configuration-blocks-graphql-playground-to-open}
     */
    this._app.use(Middlewares.helmet({
      contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false
    }))

    /**
     * It is a built-in middleware function in the Express framework for Node.js
     *
     * This middleware function is responsible for parsing incoming request
     * bodies that are in JSON format. It parses the JSON payload of the request
     * and makes it available on the req.body object of the request handler.
     *
     * @see {@link https://expressjs.com/en/api.html#express.json}
     */
    this._app.use(express.json())
    /**
     * It is a built-in middleware function in the Express framework for Node.js
     *
     * This middleware function is responsible for parsing incoming request
     * bodies that are in URL-encoded format. It parses the key-value pairs from
     * the request body and makes them available on the req.body object of the
     * request handler.
     *
     * @see {@link https://expressjs.com/en/api.html#express.urlencoded}
     */
    this._app.use(express.urlencoded({ extended: false }))
    /** Parse cookies */
    this._app.use(cookieParser())

    this._app.use('/graphql', expressMiddleware(server))

    this._app.use(Middlewares.resourceNotFound)
    this._app.use(Middlewares.internalServerError)
  }

  async listen(): Promise<void> {
    await new Promise<void>((resolve) => {
      this._httpServer = this._app.listen(this._port, () => {
        Implementation.Util.AppResponseLog.success(`App is being served on http://localhost:${this._port}\n`)
        resolve()
      })
    })
  }

  async stop(): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      if (this._httpServer != null) {
        this._httpServer?.close((error) => {
          if (error != null) {
            reject(error)
            return
          }

          return resolve
        })
      }
    })
  }
}
