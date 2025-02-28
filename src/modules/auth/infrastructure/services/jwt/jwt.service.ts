import { ConfigService } from '@nestjs/config'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { JwtService as JwtLibService } from '@nestjs/jwt'

import { Token } from '@/config/Configuration'

import { LoginPayload } from '@/modules/auth/adapters/dtos/login-payload'
import { UnauthorizedException } from '@/modules/auth/application/exceptions/unauthorized-exception'

@Injectable()
export class JwtService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtLibService
  ) {}

  async generateTokens(payload: LoginPayload): Promise<{ accessToken: string, refreshToken: string }> {
    const accessToken = await this.generateAccessToken(payload)
    const refreshToken = await this.generateRefreshToken(payload)

    return { accessToken, refreshToken }
  }

  private async generateAccessToken(payload: any): Promise<string> {
    const accessTokenConfig = this.configService.get<Token>('auth.accessToken')

    if (!accessTokenConfig || !accessTokenConfig.secret) {
      throw new InternalServerErrorException('Access token secret is not defined')
    }

    return this.jwtService.sign(payload, accessTokenConfig)
  }

  private async generateRefreshToken(payload: any): Promise<string> {
    const refreshTokenConfig = this.configService.get<Token>('auth.refreshToken')

    if (!refreshTokenConfig || !refreshTokenConfig.secret) {
      throw new InternalServerErrorException('Refresh token secret is not defined')
    }

    return this.jwtService.sign(payload, refreshTokenConfig)
  }

  async verifyToken(token: string, type: 'access' | 'refresh'): Promise<any> {
    try {
      const tokenSecret = this.configService.get<string>(`auth.${type}Token.secret`)
      return this.jwtService.verify(token, { secret: tokenSecret})
    } catch (error) {
      throw new UnauthorizedException()
    }
  }
}