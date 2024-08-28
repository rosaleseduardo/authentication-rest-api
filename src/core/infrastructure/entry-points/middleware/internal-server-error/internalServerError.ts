import { Enum } from '../../../../domain'

import type { Request, Response, NextFunction } from 'express'

/**
 * Handles errors by setting the appropriate status code and returning a JSON
 * response with error details.
 *
 * @param err - The error object that was thrown.
 * @param _req - The HTTP request object.
 * @param  res - The HTTP response object.
 * @param _next - The next middleware function.
 *
 * @see {@link https://www.codeconcisely.com/posts/how-to-handle-errors-in-express-with-typescript/#creating-a-custom-error-handling-middleware}
 */
export function internalServerError(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
): void {
  res.status(
    res.statusCode !== Enum.SUCCESSFUL_HTTP_STATUS_CODE.OK
      ? res.statusCode
      : Enum.SERVER_ERROR_HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
  )
  res.json(
    process.env.NODE_ENV === 'production'
      // @ts-expect-error: This is not introducing a bug
      ? { message: err.message, cause: err.cause }
      // @ts-expect-error: This is not introducing a bug
      : { message: err.message, cause: err.cause, stackTrace: err.stack }
  )

  next(err)
}
