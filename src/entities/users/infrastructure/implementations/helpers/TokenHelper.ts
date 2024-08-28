import jwt from 'jsonwebtoken'

import type { Interfaces, ImplLogic } from '../../../domain'

export class TokenGenerator implements ImplLogic.TokenGenerator {
  generateTokens(property: string): Interfaces.Tokens {
    const accessToken = this.generateAccessToken(property)
    const refreshToken = this.generateRefreshToken(property)

    return { accessToken, refreshToken }
  }

  generateAccessToken(property: string): Interfaces.Tokens['accessToken'] {
    const accessToken = jwt.sign({ property }, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: '30s'
    })

    return accessToken
  }

  generateRefreshToken(property: string): Interfaces.Tokens['refreshToken'] {
    const refreshToken = jwt.sign({ property }, process.env.REFRESH_TOKEN_SECRET as string, {
      expiresIn: '1d'
    })

    return refreshToken
  }

  verifyToken = jwt.verify
}
