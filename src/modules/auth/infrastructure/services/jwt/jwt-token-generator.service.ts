import { ConfigService } from '@nestjs/config'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { JwtService as JwtLibService } from '@nestjs/jwt'

import { Token } from '@/config/Configuration'

import { TokenGenerator } from '@/common/domain/identity/token-generator'

@Injectable()
export class JwtService implements TokenGenerator {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtLibService
  ) {}

  async generate(userId: string): Promise<{ accessToken: string, refreshToken: string }> {
    const accessToken = await this.generateAccessToken(userId)
    const refreshToken = await this.generateRefreshToken(userId)

    return { accessToken, refreshToken }
  }

  private async generateAccessToken(userId: string): Promise<string> {
    const accessTokenConfig = this.configService.get<Token>('auth.accessToken')

    if (!accessTokenConfig || !accessTokenConfig.secret) {
      throw new InternalServerErrorException('Access token could not be created')
    }

    return this.jwtService.sign({ userId }, accessTokenConfig)
  }

  private async generateRefreshToken(userId: string): Promise<string> {
    const refreshTokenConfig = this.configService.get<Token>('auth.refreshToken')

    if (!refreshTokenConfig || !refreshTokenConfig.secret) {
      throw new InternalServerErrorException('Refresh token could not be created')
    }

    return this.jwtService.sign({ userId }, refreshTokenConfig)
  }
}