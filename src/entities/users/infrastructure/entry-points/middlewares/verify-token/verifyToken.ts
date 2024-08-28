import { Enum } from 'core/domain'
import jwt from 'jsonwebtoken'

import type { Request, Response, NextFunction } from 'express'

/**
 * Middleware for verifying JWT tokens in incoming requests.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The Express next function to continue processing.
 */
export function verifyToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Unauthorized: Missing or invalid authorization header
    res.status(Enum.CLIENT_ERROR_HTTP_STATUS_CODE.UNAUTHORIZED).json({
      message: 'Unauthorized'
    })
  } else {
    // Extract the token from the "Authorization" header
    const token = authHeader.split(' ')[1]

    // Ensure process.env.ACCESS_TOKEN_SECRET is defined
    const secret = process.env.ACCESS_TOKEN_SECRET as string

    if (!secret) {
      // Internal Server Error: Missing token secret
      res.status(Enum.SERVER_ERROR_HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        message: 'Access token secret is not configured.'
      })
    } else {
      // Verify the JWT token
      jwt.verify(token, secret, (err) => {
        if (err) {
          // Forbidden: Token verification failed
          res.status(Enum.CLIENT_ERROR_HTTP_STATUS_CODE.FORBIDDEN).json({
            message: 'Forbidden'
          })
        } else {
          // Token is valid, continue processing
          next()
        }
      })
    }
  }
}
