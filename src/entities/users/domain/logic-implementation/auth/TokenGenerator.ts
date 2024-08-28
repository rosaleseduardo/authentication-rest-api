import { type Interfaces } from '../../../domain'

export interface TokenGenerator {
  generateTokens: (property: string) => Interfaces.Tokens
  generateAccessToken: (property: string) => Interfaces.Tokens['accessToken']
  generateRefreshToken: (property: string) => Interfaces.Tokens['refreshToken']
  verifyToken: any
}
