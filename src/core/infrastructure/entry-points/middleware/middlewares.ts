import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

import { resourceNotFound } from './resource-not-found'
import { internalServerError } from './internal-server-error'

export const Middlewares = {
  cors: cors({
    origin: [`http://localhost:${process.env.SERVER_PORT ?? 3000}`]
  }),
  morgan: morgan('dev'),
  helmet,
  resourceNotFound,
  internalServerError
}
